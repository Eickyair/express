import Task from "../models/Task.js"

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
  } catch (e) {
    res.status(500).json({ msg: e })
  }
}

export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).send(task)
  } catch (e) {
    res.status(500).json({ msg: e.message })
  }
}

export const getTask = async (req, res) => {
  const { id } = req.params
  try {
    const task = await Task.findById(id)
    if (!task) return res.status(404).json({ msg: `No task with id:${taskId}` })
    res.status(200).json({ task })
  } catch (e) {
    res.status(404).json({ msg: e })
  }
}

export const updateTask = async (req, res) => {
  const { id: taskId } = req.params
  try {
    await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({ id: taskId, data: req.body })
  } catch (e) {
    res.status(500).json({ msg: e })
  }
}
export const deleteTask = async (req, res) => {
  const { id: taskId } = req.params
  try {
    const task = await Task.findByIdAndDelete({ _id: taskId })
    if (!task) return res.status(404).json({ msg: `No task with id:${taskId}` })
    res.status(200).json({ task })
  } catch (e) {
    res.status(500).json({ msg: e })
  }
}