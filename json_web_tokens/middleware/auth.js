import * as jwt from "jsonwebtoken"
import APIError from "../exceptions/APIError.js"

const authorizationByToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new APIError('No token provided', 401)
  }
  const token = authHeader.split(' ')[1]
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decode;
    req.user = { id, username }
    next()
  } catch (err) {
    throw new APIError('Not authorized to access this route', 401)
  }
}

export default authorizationByToken