import log from "../utils/Logger";
import { Database } from 'sqlite3'
import express from 'express'
import ApplyMiddleWares from "../utils/GlobalMiddlerwares";

require("dotenv").config();

const app = express()

ApplyMiddleWares(app)

app.use(express.json())

const PORT = process.env.PORT || 5000

const Connection = new Database('Base.db')

app.listen(PORT, async () => {
    log.info(`listning on port ${PORT}`)
})

export default Connection