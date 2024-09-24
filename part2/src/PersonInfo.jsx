import { useState, useEffect } from 'react'

export default function PersonInfo() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNb, setNewNb] = useState('')
  const [filterText, setFilterText] = useState('')
  const [message, setMessage] = useState('')
  const [haveError, setHaveError] = useState(false)

  const initState = () => {
    setTimeout(() => {
      setMessage('')
      setHaveError(false)
    }, 5000)
  }

  const addNote = (event) => {
    event.preventDefault()
    if (newName && newNb) {
      console.log('button clicked', event.target)

      const newPerson = { name: newName, number: newNb }
      const findNb = persons.filter((person) => person.name === newName)

      if (findNb.length) {
        let updatePerson = { ...findNb[0], number: newNb }
        if (
          confirm(
            `${newName} is already added to phonebook, replace the old number with new one?`
          )
        ) {
          updateEvent(findNb[0].id, updatePerson)
        }
      } else {
        addEvent(newPerson)
      }
    }
  }

  const addEvent = (newPerson) => {
    personService
      .create(newPerson)
      .then((res) => {
        setMessage(`${newName} is already update to phonebook`)
        console.log('create res', res)
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNb('')
      })
      .catch((error) => {
        setMessage(error.response.data.error)
        setHaveError(true)
        console.log('add error', error)
      })
  }

  const updateEvent = (id, updatePerson) => {
    personService
      .update(id, updatePerson)
      .then((res) => {
        setMessage(`${newName} is already add to phonebook`)
        console.log('update res', res)
        const updateP = persons.map((person) => {
          if (person.id === id) {
            return res
          } else {
            return person
          }
        })
        setPersons(updateP)
        //setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNb('')
      })
      .catch((error) => {
        setHaveError(true)
        setMessage(error.response.data.error)
        // initState()
        console.log('update error', error)
      })
  }

  const handleDelete = (person) => {
    if (confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id).then((res) => {
        console.log('delete res', res)
        let filtered = persons.filter((item) => item.id !== person.id)
        setPersons(filtered)
      })
    }
  }

  const handleNameChange = (event) => {
    //    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNbChange = (event) => {
    setNewNb(event.target.value)
  }

  const filteredList = persons.filter((person) =>
    person.name.includes(filterText)
  )

  const handleFilterText = (event) => {
    setFilterText(event.target.value)
  }

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res))
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} haveError={haveError} />
      <Filter filterText={filterText} handleFilterText={handleFilterText} />

      <h2>add a new</h2>
      <PersonForm
        addNote={addNote}
        newName={newName}
        newNb={newNb}
        handleNameChange={handleNameChange}
        handleNbChange={handleNbChange}
      />

      <h3>Numbers</h3>
      <Persons filteredList={filteredList} handleDelete={handleDelete} />
    </div>
  )
}
