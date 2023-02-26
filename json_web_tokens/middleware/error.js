import APIError from "../exceptions/APIError.js"
const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) return res.status(err.statusCode).json({ message: err.message })
  return res.status(500).send(err.message)
}
export default errorHandler