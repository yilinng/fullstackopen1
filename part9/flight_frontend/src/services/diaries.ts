import axios from 'axios'
import { NewDiaryEntry, DiaryEntry } from '../types/types'
const baseUrl = 'http://localhost:3000/api/diaries'

export const getAll = () => {
  const request = axios.get<DiaryEntry[]>(baseUrl)

  return request.then(response => response.data)
}

export const create = (newObject: NewDiaryEntry) => {
  const request = axios.post<DiaryEntry>(baseUrl, newObject)
  return request.then(response => response.data)
}

export const update = (newObject: DiaryEntry) => {
  const request = axios.put<DiaryEntry>(`${baseUrl}/${newObject.id}`, newObject)
  return request.then(response => response.data)
}

export const deleteItem = (id: number) => {
  const request = axios.delete<number>(`${baseUrl}/${id}`,)
  return request.then(response => response.data)
}

