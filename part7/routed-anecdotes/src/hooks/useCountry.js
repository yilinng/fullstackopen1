import { useState, useEffect } from 'react'
import countryService from '../services/country'

export const useCountry = (keyword) => {
  const [country, setCountry] = useState(null)

  const fetchData = () => {
    countryService
      .getItem(keyword)
      .then((res) => {
        console.log('res', res)
        setCountry(res)
      })
      .catch((err) => {
        console.log('err', err)
        setCountry(err.response)
      })
  }

  useEffect(() => {
    console.log('keyword', keyword)
    if (keyword) {
      fetchData()
    }
  }, [keyword])

  return country
}
