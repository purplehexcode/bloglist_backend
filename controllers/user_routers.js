const mongoose = require('mongoose')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.get('/',async(req,res)=>{
    const users = await userModel.find({}).populate('blogs')
    res.json(users)
})

userRouter.post('/',async(req,res)=>{
    const userData = req.body
    if (userData.password.length < 3){
        res.status(400).json({'error':'Bad Request(password length must be greater than or equal to 3)'})
    }
    userData.password = await bcrypt.hash(userData.password,10)
    const user = new userModel(userData)
    try{
        const createdUser = await user.save()
        const token = await jwt.sign({id: createdUser._id},process.env.SECRET_KEY)
        res.json({user: createdUser,token: token})
    }
    catch(exception){
        res.status(400).json({'error':exception.message})
    }
})

module.exports = userRouter
