import axios from 'axios'

let todoAPIUrl: string

if (import.meta.env.VITE_REACT_ENV === 'test') {
  todoAPIUrl = import.meta.env.VITE_TODOS_URL_TEST
} else if (import.meta.env.VITE_REACT_ENV === 'production') {
  todoAPIUrl = import.meta.env.VITE_TODOS_URL_PRODUCTION
} else {
  todoAPIUrl = import.meta.env.VITE_TODOS_URL_DEVELOPMENT
}

if (todoAPIUrl === undefined) throw new Error('import.meta.env.TODOS_URL not set')

const createTodoUrl = todoAPIUrl + 'new'
const todoIdUrl = (id: string) => todoAPIUrl + id
const updateTodoUrl = (id: string) => todoAPIUrl + 'edit/' + id
const updateAllCompleteUrl = todoAPIUrl + 'edit/completed'


type GetAllTodosParams = {
  month?: undefined | string;
  year?: undefined | string;
}

export const getAllTodos = async ({ month = undefined, year = undefined }: GetAllTodosParams = {}) => {
  console.log("Environment:", import.meta.env.VITE_REACT_ENV)
  console.log("getAllTodos - API URL:", todoAPIUrl)
  let params = {}
  if (month && year) {
    params = { month, year }
  }
  const res = await axios.get(todoAPIUrl, { params: params })
  return res.data
}

export const getCompletedTodos = async ({ month = undefined, year = undefined }: GetAllTodosParams = {}) => {
  console.log("getAllTodos - API URL:", todoAPIUrl)
  let params = {}
  if (month && year) {
    params = { month, year }
  }
  const res = await axios.get(todoAPIUrl + 'completed', { params: params })
  return res.data
}

export const getTodo = async (id: string) => {
  console.log("getTodo - API URL:", todoIdUrl(id))
  const res = await axios.get(todoIdUrl(id))
  return res.data
}

export const createTodo = async (data: Todo) => {
  console.log("createTodo - API URL:", createTodoUrl)
  const res = await axios.post(createTodoUrl, data)
  return res.data
}

export const updateTodo = async (id: string, data: Todo) => {
  console.log("updateTodo - API URL:", updateTodoUrl(id))
  const res = await axios.put(updateTodoUrl(id), data)
  return res.data
}

export const toggleCompleted = async (id: string) => {
  const url = updateTodoUrl(id) + '/toggle_completed'
  const res = await axios.put(url)
  return res.data
}

type CompletedData = { completed: boolean }

export const markAllComplete = async () => {
  console.log("markAllComplete - API URL:", updateAllCompleteUrl)
  const data: CompletedData = { completed: true }
  const res = await axios.put(updateAllCompleteUrl, data)
  return res.data
}

export const markAllInComplete = async () => {
  console.log("markAllInComplete - API URL:", updateAllCompleteUrl)
  const data: CompletedData = { completed: false }
  const res = await axios.put(updateAllCompleteUrl, data)
  return res.data
}

export const deleteTodo = async (id: string) => {
  console.log("deleteTodo - API URL:", todoIdUrl(id))
  const res = await axios.delete(todoIdUrl(id))
  return res.data
}

export const deleteAllTodos = async () => {
  console.log("deleteAllTodo - API URL:", todoAPIUrl)
  const res = await axios.delete(todoAPIUrl)
  return res.data
}
