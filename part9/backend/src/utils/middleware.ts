const logger = require('./logger')

const requestLogger = (request: { method: any; path: any; body: any }, _response: any, next: () => void) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_request: any, response: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { error: string }): void; new(): any } } }) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: { message: any; name: string }, _request: any, response: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { error: string }): any; new(): any }; json: { (arg0: { error: any }): any; new(): any } } }, next: (arg0: any) => void) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}