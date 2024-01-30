const mongoose = require("mongoose")
const tools = require('../utils/tools')

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	}
})
blogSchema.set('toJSON', {
	transform: tools.transform
})
module.exports = mongoose.model("blogs",blogSchema)