const baseURLApi = '/api/v1/tasks'
const idContainerTasks = 'app'
const idDOMCompleted = 'completed-task'
const idDOMNotComplete = 'no-completed-task'
const idDomInputName = 'input-name'
const idFormAdd = 'form-add'
const idInputSubmit = 'agregar'
const idWait = 'wait'
// dom elements
const listTaskDOMCompleted = document.getElementById(idDOMCompleted)
const listTaskDOMNotCompleted = document.getElementById(idDOMNotComplete)
const formDom = document.getElementById(idFormAdd)
const inputNameDOM = document.getElementById(idDomInputName)
const inputDomSubmit = document.getElementById(idInputSubmit)
// buttons
const urlIconEliminar = './eliminar.png'
const urlIconEditar = './editar.png'

var idTask;
var updateInfo;
async function getInfoTasks() {
  const res = await fetch(baseURLApi)
  const json = await res.json()
  return json.tasks
}
function createElementTask(parentNode, infoTask) {
  const liDom = document.createElement('li')
  const { name, completed, _id: id } = infoTask
  const textStyle = completed ? 'not-completed' : ''
  liDom.classList.add('container')
  liDom.id = id
  liDom.innerHTML =
    `<p class='${textStyle}'>${name}</p>
    <div class='div-buttons'>
      <img/ src='${urlIconEditar}' class='edit'>
      <img/ src='${urlIconEliminar}' class='del'>
    </div>`
  parentNode.appendChild(liDom)
}
function renderTasks(parentNodeDOM, listOfTask) {
  if (listOfTask.length === 0) return false
  listOfTask.forEach((infoTask) => createElementTask(parentNodeDOM, infoTask))
}

getInfoTasks()
  .then((tasks) => {
    const listTasksCompleted = tasks.filter(({ completed }) => completed)
    const listTasksNotCompleted = tasks.filter(({ completed }) => !completed)
    const wait = document.getElementById(idWait)
    wait.style.display = 'none'
    renderTasks(listTaskDOMNotCompleted, listTasksNotCompleted)
    renderTasks(listTaskDOMCompleted, listTasksCompleted)
  })
function updateDOMTask(infoTask, prevCompletedValue) {
  const { name, completed } = infoTask
  const liDomNew = document.createElement('li')
  const textStyle = completed ? 'not-completed' : ''
  liDomNew.classList.add('container')
  liDomNew.id = idTask
  liDomNew.innerHTML =
    `<p class='${textStyle}'>${name}</p>
    <div class='div-buttons'>
      <img/ src='${urlIconEditar}' class='edit'>
      <img/ src='${urlIconEliminar}' class='del'>
    </div>`
  const parent = (completed) ? listTaskDOMCompleted : listTaskDOMNotCompleted
  const liDomOld = document.getElementById(idTask)
  let change = false;
  if (completed === prevCompletedValue) {
    parent.insertBefore(liDomNew, liDomOld)
  }
  else if (completed !== prevCompletedValue) {
    parent.appendChild(liDomNew)
  }
  // create new element
  { liDomOld && liDomOld.remove() }
}
function updateTask() {
  const inputName = document.getElementById('name-value')
  const completedValue = document.getElementById('completed-value')
  const endpoint = `${baseURLApi}/${idTask}`
  const body = JSON.stringify({ name: inputName.value, completed: completedValue.checked })

  return new Promise((resolve, reject) => {
    try {
      fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })
        .then(res => res.json())
        .then(json => resolve(json.data))
    } catch (err) {
      reject(err)
    }
  })
}
function renderModal(name, completed) {
  const main = document.getElementById('app')
  const modal = document.createElement('div')
  const comp = completed ? 'checked' : ''
  const close = 'close-modal'
  const save = 'modal-save'
  modal.id = 'modal-edit'
  modal.innerHTML =
    `<div class='modal-content'>
    <div class = 'modal-header'>
      <h4>Edit</h4>
      <button id='${close}'>X</button>
    </div>
    <div class='modal-body'>
      <div class='modal-inputs'>
        <input type='text' value='${name}' id='name-value'/>
        <input type='checkbox' ${comp} id='completed-value'/>
      </div>
      <button id='${save}'>Save</button>
    </div>
    </div>
    `
  main.insertBefore(modal, main.firstChild)
  const handleClick = (e) => {
    const target = e.target
    if (target.id === close) {
      modal.removeEventListener('click', handleClick, true)
      modal.remove()
      return
    }
    if (target.id === save) {
      updateTask()
        .then(newData => {
          updateDOMTask(newData, completed)
          modal.removeEventListener('click', handleClick, true)
          modal.remove()
        })
    }
  }
  modal.addEventListener('click', handleClick, true)
}

async function deleteTask(id) {
  const endpoint = `${baseURLApi}/${id}`
  const res = await fetch(endpoint, {
    method: 'DELETE'
  })
  return await res.json()
}
function editOrDelete(target) {
  const className = target.classList[0]
  const liParent = target.parentNode.parentNode
  idTask = liParent.id
  switch (className) {
    case 'edit': {
      const p = liParent.firstChild
      const name = p.innerHTML
      const completed = (liParent.parentNode.id === 'completed-task') ? true : false
      renderModal(name, completed, p)
      break
    }
    case 'del': {
      deleteTask(idTask)
        .then(() => liParent.remove())
      break
    }
  }
}

async function postTask(name) {
  const res = await fetch(baseURLApi, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })
  return await res.json()
}

function create(target) {
  const idInput = target.id
  if (!idInput) return
  switch (idInput) {
    case 'agregar': {
      const inputName = document.getElementById('input-name')
      postTask(inputName.value)
        .then(task => {
          idTask = task._id
          updateDOMTask(task)
          inputName.value = ''
        })
    }
  }
}
function handleClickTasks(event) {
  const target = event.target
  const tagName = target.tagName
  switch (tagName) {
    case 'IMG': return editOrDelete(target)
    case 'INPUT': return create(target)
  }
}


function setListeners() {
  const form = document.getElementById('form-add')
  form.addEventListener('submit', (e) => e.preventDefault())
  const divTasks = document.getElementById(idContainerTasks)
  divTasks.addEventListener('click', handleClickTasks, true)
}
function main() {
  setListeners()
}
main()