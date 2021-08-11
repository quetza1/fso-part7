import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  let inputName = name

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
      )
      const data = response.data[0]
      console.log(data)
      setCountry(data)
      return data
    } catch (error) {}
  }

  // getData()
  useEffect(() => {
    getData()
  }, [inputName])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country) {
    return <div>not found...</div>
  }

  return (
    <div>
      {/* <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height='100'
        alt={`flag of ${country.data.name}`}
      /> */}
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
    </div>
  )
}

const App = () => {
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

export default App
