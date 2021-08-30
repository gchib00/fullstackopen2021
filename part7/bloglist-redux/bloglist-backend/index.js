// eslint-disable-next-line no-unused-vars
const http = require('http')
const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

logger.info('starting the application..')
const server = http.createServer(app)


server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})