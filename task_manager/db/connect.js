import mongoose from "mongoose"
mongoose.set('strictQuery', false)
const connectionString =
  process.env.MONGO_URI


async function connectionDB(url) {
  await mongoose.connect(url);
  console.log('CONNECTED TO THE DB...')
}
export default connectionDB