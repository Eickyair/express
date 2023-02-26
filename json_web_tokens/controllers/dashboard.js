import APIError from "../exceptions/APIError.js"
import { default as Jwt } from "jsonwebtoken"
const dashboard = (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100)
  res.status(200).json({ message: `Hello ${req.user.username}`, secretKey: `Your secret key is ${randomNumber}` })
}
export default dashboard