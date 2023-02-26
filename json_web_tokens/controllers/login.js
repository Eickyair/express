import { default as Jwt } from "jsonwebtoken";
import APIError from "../exceptions/APIError.js"

const login = (req, res) => {
  const { username, password } = req.body
  if (!username || !password) throw new APIError('Email or password', 400)
  const id = new Date().getDate()
  const token = Jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
  res.status(200).json({ message: `user created`, token })
}

export default login