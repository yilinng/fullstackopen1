//const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
import { bmiCalculator } from './utils/bmiCalculator'
import { exerciseCalculator } from './utils/exerciseCalculator'
import patientReouter from './routes/patients'
import diagnoseRouter from './routes/diagnoses'

const middleware = require('./utils/middleware')
//const logger = require('./utils/logger')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/api/ping', (_req: any, res: any) => {
  res.send('pong');
});

//https://stackoverflow.com/questions/59812643/how-to-get-a-variable-input-in-url-after-question-mark-javascript
app.get('/api/bmi?', (req: any, res: any) => {
  console.log('req.query', req.query)
  console.log("req.params", req.params)
  const { height, weight } = req.query
  const result = bmiCalculator(height, weight)
  
  res.json(result)
});

app.post('/api/exercises', (req: any, res: any) => {
  
  console.log("req.body", req.body)
  const { daily_exercises, target } = req.body
  const newArr = [target, ...daily_exercises]
  console.log('new Arr', newArr)
  const result = exerciseCalculator(Number(target), newArr)
  
  res.json(result)
});

app.use('/api/patients', patientReouter)
app.use('/api/diagnoses', diagnoseRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app