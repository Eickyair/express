import * as dotenv from "dotenv"
import express from "express"
import { error, notFound } from "./middleware/index.js"
import { default as main } from "./routes/index.js"
dotenv.config()
const app = express()
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1', main)

app.use(error)
app.use(notFound)

const port = process.env.PORT || 3000


const start = async () => {
  try {
    await app.listen(port, console.log(`Server on port ${port}`))
  } catch (err) {
    console.log(err)
  }
}
start()