require("dotenv").config()

const MONGODB_URI = process.env.NODE_ENV == "testing"? 
	process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
const PORT = process.env.PORT

console.log(`Using database: ${MONGODB_URI}`)

module.exports = {
	MONGODB_URI,
	PORT
}