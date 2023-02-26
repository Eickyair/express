import dotenv from "dotenv"
import express from "express"
import * as express_async_errors from "express-async-errors"
import connect from "./db/connect.js"

import { errorHandler, notFound } from "./middleware/index.js"
import { default as products } from "./routes/products.js"

dotenv.config()
const app = express();
const port = process.env.PORT || 3000;
// middleware
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>')
})
app.use("/api/v1/products", products)


app.use(errorHandler)
app.use(notFound)



// routes

async function start() {
  try {
    await connect(process.env.MONGO_URI)
    app.listen(port, console.log(`Server on port:${port}`))
  } catch (err) {
    console.log(err)
  }
}
start()