const logger = require("./logger")
const jwt = require('jsonwebtoken')

const requestLogger = (request,response,next) => {
	logger.info(`${request.method} ${request.path}` ,request.body)
	next()
}

const unknownEndPoint = (request,response) => {
	response.status(404).json({error:`Cannot Get: ${request.path}`})
}

const errorHandler = (error,request,response,next) => {
	logger.error(`${error.name} ${error.message}`)
	if (error.name ===  'JsonWebTokenError') {
		return response.status(401).json({ error: error.message })
	}
	next()
}
const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		const token = authorization.replace('Bearer ', '')
		request.token = token
	}
	next()
}

const userExtractor = (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET_KEY)
	request.user = decodedToken.id
	next()
}


module.exports = {
	userExtractor,
	tokenExtractor,
	requestLogger,
	unknownEndPoint,
	errorHandler
}