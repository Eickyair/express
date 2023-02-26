import dotenv from "dotenv"
import connectionDB from "./db/connect.js"
import { default as Product } from "./models/product.js"
import jsonProducts from "./products.js"
dotenv.config()
const start = async () => {
  try {
    await connectionDB(process.env.MONGO_URI)
    await Product.deleteMany()
    await Product.create(jsonProducts)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
// console.log(jsonProducts)
start()