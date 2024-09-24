import { useContext } from 'react'
import {  useMutation, useQueryClient } from '@tanstack/react-query'
import { useField } from '../hooks/useField'
import { Weather, Visibility, DiaryContextType, MessageEntry, VisibilityOption, WeatherOption, DiaryEntry } from '../types/types'
import Info from './Info'
import { create } from '../services/diaries'
import DiaryContext from '../context/DiaryContext'
import axios from 'axios'

export default function AddDiary() {
  const queryClient = useQueryClient()
  const { info, successAction, failAction, cleanAction } = useContext(DiaryContext) as DiaryContextType

  const newMutation = useMutation({
    mutationFn: create,
    onSuccess: (newDirary) => {
      queryClient.invalidateQueries({ queryKey: ['diaries'] })
     // let diaries: DiaryEntry[] = queryClient.getQueryData(['diaries']) as DiaryEntry[]
     // queryClient.setQueryData(['diaries'], diaries.concat(newDirary))
     // console.log('diaries', diaries)
      console.log(newDirary);
      const res: MessageEntry = {
        message: `Comment ${newDirary.comment} is add successed.`,
        error: null
      }
      successAction(res)
      
      setTimeout(() => {
        const res: MessageEntry = {
          message: null,
          error: null
        }
       cleanAction(res)
      }, 5000)
    },
    onError: (error) => {
      //https://dev.to/mdmostafizurrahaman/handle-axios-error-in-typescript-4mf9
      console.log(error)
      if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response);
        // Do something with this error...
        const res: MessageEntry = {
          message: null,
          error: error.response?.data
        }
        failAction(res)
        setTimeout(() => {
          const res: MessageEntry = {
            message: null,
            error: null
          }
         cleanAction(res)
        }, 5000)
      } else {
        console.error(error);
      }
    }
    
  })
  
  const date = useField('date')
  const visibility = useField('text')
  const weather = useField('text')
  const comment = useField('text')

 // console.log('date', date.value)
 // console.log('visibility', visibility.value)
 // console.log('weather', weather.value)
 // console.log('comment', comment.value)

  const addDirary = (event: React.SyntheticEvent) => {
    event.preventDefault()

   // if (date.value && visibility.value && weather.value && comment.value) {
      const pickV = visibility.value as Visibility

      const pickW = weather.value as Weather

      console.log('pickV', pickV);
      console.log('pickW', pickW)

      newMutation.mutate({ date: date.value, visibility: pickV, weather: pickW, comment: comment.value })
      date.onReset()
      visibility.onReset()
      weather.onReset()
      comment.onReset()
    //}
      
  }

  const visibilityOptions : VisibilityOption[] = Object.values(Visibility).map((v) => ({
    value: v,
    label: v.toString(),
  }))
  const weatherOptions: WeatherOption[] = Object.values(Weather).map((v) => ({
    value: v,
    label: v.toString(),
  }))

  return (
    <div>
      <h2>AddDiary</h2>
      <Info {...info} />
      <form onSubmit={addDirary}>

        <div className='date'>
        <label htmlFor="date">date:</label>
          <input {...date} />
        </div>

        <div className='visibility'>
          <label htmlFor='visibility'>
          visibility:
            <select {...visibility} >   
              {visibilityOptions.map(key => <option key={key.label} value={key.value}>{key.value}</option>)}
            </select>
            selected: {visibility.value}
          </label>
        </div>
       
        <div className='weather'>
          <label>
          weather:
          <select {...weather}>
          {weatherOptions.map(key => <option key={key.label} value={key.value}>{key.value}</option>)}
            </select>
            selected: {weather.value}
          </label>
        </div>

        <div className='comment'>
        <label htmlFor="comment">comment:</label>
          <input {...comment} />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  )
}
