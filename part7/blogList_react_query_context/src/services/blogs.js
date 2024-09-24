import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = axios.post(baseUrl, newObject, config)
  return response.then((response) => response.data)
}

const update = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  console.log('update request', request)
  return request.then((response) => response.data)
}

const deleteItem = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

const addComment = (obj) => {
  const request = axios.put(`${baseUrl}/${obj.id}/comments`, obj)
  return request.then((response) => response.data)
}

export default { getAll, create, update, deleteItem, setToken, addComment }
