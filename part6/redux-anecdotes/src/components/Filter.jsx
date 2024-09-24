import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

export default function Filter() {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const content = event.target.value
    dispatch(filterChange(content))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input name='note' onChange={handleChange} />
    </div>
  )
}
