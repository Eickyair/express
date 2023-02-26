import { Router } from "express";
import { getAllTasks, createTask, deleteTask, getTask, updateTask } from "../controllers/tasks.js";
const router = Router()

router.route('/')
  .get(getAllTasks)
  .post(createTask)
// :id es un parámetro que va a recibir par la url
router.route('/:id')
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask)

export default router