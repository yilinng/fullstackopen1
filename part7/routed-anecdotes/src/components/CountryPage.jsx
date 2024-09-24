import { useState } from 'react'
import { useField } from '../hooks/useField'
import { useCountry } from '../hooks/useCountry'
import Country from './Country'

export default function CountryPage() {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}
