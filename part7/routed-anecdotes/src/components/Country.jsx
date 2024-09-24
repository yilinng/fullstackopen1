import { useEffect } from 'react'

export default function Country({ country }) {
  if (!country) {
    return null
  }

  if (country.statusText === 'Not Found') {
    return <div>not found...</div>
  }

  useEffect(() => {
    console.log('country', country)
  }, [country])
  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img
        src={country.flags.png}
        height='100'
        alt={`flag of ${country.name.common}`}
      />
    </div>
  )
}
