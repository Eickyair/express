async function errorHandler(err, req, res, next) {
  console.log(err)
  return res.status(500).json({ message: 'error' })
}
export default errorHandler