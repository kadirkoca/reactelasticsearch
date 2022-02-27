const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "./.env") })
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const apirouter = require("./routes/api.routes")

const app = express()

var corsOptions = {
    origin: process.env.FRONT_ORIGIN,
    credentials: true,
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use("/api/v1", apirouter)

// set port, listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})