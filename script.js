// create the todo item data structure
class ToDo {
  constructor(text, isComplete = false) {
    this.id = crypto.randomUUID()
    this.text = text
    this.isComplete = isComplete
  }

  toggle() {
    this.isComplete = !this.isComplete
  }
}
// create the todo list data structure
let list = []

const userInput = document.querySelector('#text')
const addBtn = document.querySelector('#add')
const ul = document.querySelector('#items-list')

const saveList = list => localStorage.setItem('todoList', JSON.stringify(list))

const createToDo = evt => {
  evt.preventDefault() // stop form default behaviour .. i.e, form submission to a backend
  const text = userInput.value
  const newTodo = new ToDo(text)
  list.push(newTodo)
  createDOMElements(newTodo)
  saveList(list)
}

const createDOMElements = todo => {
  const li = document.createElement('li')
  li.classList.add(
    'list-group-item',
    'd-flex',
    'align-items-center',
    'justify-content-between'
  )
  ul.appendChild(li)

  const textDiv = document.createElement('div')
  textDiv.classList.add('d-flex', 'gap-1', 'flex-row-reverse')
  li.appendChild(textDiv)

  const BtnGrpDiv = document.createElement('div')
  BtnGrpDiv.classList.add('d-flex', 'gap-1')
  li.appendChild(BtnGrpDiv)

  const label = document.createElement('label')
  label.innerText = todo.text
  label.classList.add('truncate')
  label.style.textDecoration = todo.isComplete ? 'line-through' : ''
  textDiv.appendChild(label)
  const labelOnBlue = () => {
    label.removeAttribute('contenteditable')
    todo.text = label.innerText
    saveList(list)
  }
  label.addEventListener('blur', labelOnBlue)

  const cb = document.createElement('input')
  cb.setAttribute('type', 'checkbox')
  todo.isComplete
    ? cb.setAttribute('checked', true)
    : cb.removeAttribute('checked')
  textDiv.appendChild(cb)
  const cbOnClick = () => {
    todo.toggle()
    label.style.textDecoration = todo.isComplete ? 'line-through' : ''
  }
  cb.addEventListener('click', cbOnClick)

  const delBtn = document.createElement('button')
  delBtn.innerText = 'Del'
  delBtn.classList.add('btn', 'btn-danger')
  BtnGrpDiv.appendChild(delBtn)
  const delBtnOnClick = () => {
    list = list.filter(td => td.id !== todo.id)
    saveList(list)
    li.remove()
    label.removeEventListener('blur', labelOnBlue)
    cb.removeEventListener('click', cbOnClick)
    delBtn.removeEventListener('click', delBtnOnClick)
    editBtn.removeEventListener('click', editBtnOnClick)
  }
  delBtn.addEventListener('click', delBtnOnClick)

  const editBtn = document.createElement('button')
  editBtn.innerText = 'Edit'
  editBtn.classList.add('btn', 'btn-secondary')
  BtnGrpDiv.appendChild(editBtn)
  const editBtnOnClick = () => {
    label.setAttribute('contenteditable', true)
  }
  editBtn.addEventListener('click', editBtnOnClick)
}

addBtn.addEventListener('click', createToDo)
