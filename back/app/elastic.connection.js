const { Client } = require("@elastic/elasticsearch")

const config = {
    user: process.env.ELASTIC_USER,
    pass: process.env.ELASTIC_PASS,
    host: process.env.ELASTIC_HOST,
    port: process.env.ELASTIC_PORT,
}

const elasticClient = new Client({
    node: `http://${config.host}:${config.port}`,
    auth: {
        username: config.user,
        password: config.pass,
    }
})
module.exports = elasticClient
