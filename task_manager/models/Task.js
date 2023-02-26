import { Schema, model } from "mongoose";
// toda la información que no este definida en el Schema se ignora
const TaskSchema = new Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const Task = model('Tasks', TaskSchema)
export default Task;