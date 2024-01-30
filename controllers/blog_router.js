const { request } = require("../app")
const blog = require("../models/blog")
const blogModel = require("../models/blog")
const blogRouter = require("express").Router()
const User = require('../models/user')
const mongoose = require('mongoose')

blogRouter.get("/",async(request,response)=>{
	console.log('user',request.user)
	const blogs = await blogModel.find({user: new mongoose.Types.ObjectId(request.user)})
	response.json(blogs)
	
})

blogRouter.post("/",async(request,response)=>{
	if(!('likes' in request.body)){
		request.body.likes = 0
	}
	if(!('title' in request.body) || !('url' in request.body)){
		response.status(400).json({
			'error':'Bad Request'
		})
	}
	
	const user = await User.findById(new mongoose.Types.ObjectId(request.user))
	console.log('user found was',user)
	if(user){
		const blog = new blogModel({...request.body,user:request.user})
		const savedBlog = await blog.save()
		console.log('saved blog',savedBlog)
		user.blogs = user.blogs.concat(savedBlog._id)
		user.save()
		response.status(201).json(savedBlog)
	}
})

blogRouter.delete('/:id',async (req, res, next) => {
	const id = req.params.id;

	try {
			const blog = await blogModel.findById(new mongoose.Types.ObjectId(id))
			console.log(blog.id)
			console.log(req.user)
			// console.log(decodedToken)
			if(blog && blog.user.toString()===req.user.toString()){
				const response = await blog.deleteOne()
				console.log(response)
				if (response) {
					res.status(202).json({ 'status': 'deleted' });
				} else {
					res.status(404).json({ 'error': 'Resource not found' });
				}
			}
			else{
				res.status(401).json({'validation':'Not authorised user'})
			}
		
		} catch (error) {
		next(error);
		}
});

blogRouter.put('/:id',async(req,res,next)=>{
	const id = new mongoose.Types.ObjectId(req.params.id)
	const data = req.body
	const updateNote = await blogModel.findByIdAndUpdate(id,data,{new:true})
	if(updateNote){
		res.status(200).json(updateNote)
	}
	else{
		res.status(404).send()
	}
})

module.exports = blogRouter

