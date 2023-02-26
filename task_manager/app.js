import connectionDB from './db/connect.js'
import * as dotenv from 'dotenv'

dotenv.config()
import express from 'express'
import { default as tasks } from './routes/tasks.js'
const app = express()
const port = process.env.PORT || 3000
//middleware
app.use(express.json())
app.use(express.static('public'))
//endpoints
app.use('/api/v1/tasks', tasks)


const start = async () => {
  try {
    await connectionDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listen on port ${port}`))
  } catch (e) {
    console.error(e)
  }
}
start()
