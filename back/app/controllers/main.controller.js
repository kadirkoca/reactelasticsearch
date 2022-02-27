const elasticClient = require("../elastic.connection")
const { format } = require("date-and-time")

const elasticIndex = "users"

// {
//     id: "1",
//     name: "John",
//     surname: "Doe",
//     birthday: "12.05.2022",
//     phone: "+3809898989",
//     email: "john@mail.com",
//     created_at: "12.05.2022 12:34",
//     updated_at: "12.05.2022 12:34",
// },
exports.storeuser = (req, res) => {
    const { id, name, surname, birthday, phone, email, method } = req.body
    const created_at = format(new Date(), "DD.MM.YYYY HH:mm")
    const updated_at = created_at
    
    switch (method) {
        case "new":
            elasticClient
                .index({
                    index: elasticIndex,
                    body: { name, surname, birthday, phone, email, created_at, updated_at },
                })
                .then((response) => {
                    return res.json({ message: "Indexing successful" })
                })
                .catch((err) => {
                    return res.status(501).json({ message: err.message })
                })
            break
        case "update":
            elasticClient
                .update({
                    index: elasticIndex,
                    id,
                    body: {
                        doc: {
                            name,
                            surname,
                            birthday,
                            phone,
                            email,
                            updated_at,
                        },
                    },
                })
                .then((response) => {
                    return res.json({ message: "Indexing successful" })
                })
                .catch((err) => {
                    return res.status(500).json({ message: err.message })
                })
            break
        case "delete":
            elasticClient
                .delete({
                    index: elasticIndex,
                    id,
                })
                .then((response) => {
                    return res.json({ message: "Indexing successful" })
                })
                .catch((err) => {
                    return res.status(500).json({ message: err.message })
                })
            break
    }
}

exports.indexusers = (req, res) => {
    const searchText = figureQuery(req.query)
    const query = searchText.length === 0 ? { match_all: {} } : { bool: { should: searchText } }

    elasticClient
        .search(
            {
                index: elasticIndex,
                from: 0,
                size: 100,
                body: {
                    query,
                },
            },
            {
                ignore: [404],
                maxRetries: 3,
            },
            (err, result) => {
                if (err) console.log(err)
            }
        )
        .then((response) => {
            return res.json(response?.hits?.hits)
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message })
        })
}

const fields = ["name", "surname", "birthday", "phone", "email", "created_at", "updated_at"]

const figureQuery = (query) => {
    const searchGroup = []
    for (const field in query) {
        if (fields.includes(field)) {
            let fieldset = {}
            fieldset[field] = query[field].trim()
            let match = {}
            match["match"] = fieldset
            searchGroup.push(match)
        }
    }
    return searchGroup
}
