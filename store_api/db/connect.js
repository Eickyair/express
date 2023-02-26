import mongoose from "mongoose"
mongoose.set('strictQuery', false)
async function connectionDB(url) {
  await mongoose.connect(url);
  console.log('CONNECTED TO THE DB...')
}
export default connectionDB