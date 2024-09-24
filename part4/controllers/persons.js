const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response, next) => {
  Person.find()
    .then((persons) => {
      if (persons.length) {
        console.log(persons)
        response.json(persons)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

personsRouter.get(':id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

personsRouter.post('/', async (request, response, next) => {
  const { name, number } = request.body

  const isExist = await Person.findOne({ name })

  if (isExist) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then((savePerson) => {
      response.json(savePerson)
    })
    .catch((error) => next(error))
})

personsRouter.put('/:id', async (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

module.exports = personsRouter
