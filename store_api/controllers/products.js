import { default as Product } from "../models/product.js"

export const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('name').select('name price')
  res.status(200).json({ nbHits: products.length, products })
}
export const getAllProducts = async (req, res) => {
  // Si pasas un campo en la query que no esta definido en tu modelo, la busqueda dara un array vacio

  // posible solucion
  const { featured, company, name, sort, fields } = req.query
  const queryObj = {}
  if (featured) {
    (featured === 'true') ? queryObj.featured = true : queryObj.featured = false
  }
  if (company) {
    queryObj.company = company
  }
  if (name) {
    queryObj.name = { $regex: name, $options: 'i' }
  }
  let promise = Product.find(queryObj);
  if (sort) {
    const sortList = sort.split(',').join(' ');
    promise = promise.sort(sortList);
  } else {
    promise = promise.sort('createdAt');
  }
  if (fields) {
    const fieldList = fields.split(',').join(' ')
    promise = promise.select(fieldList)
    console.log(fieldList)
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await promise
  res.status(200).json({ nbHits: products.length, products })
}

