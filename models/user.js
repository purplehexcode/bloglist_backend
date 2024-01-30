const mongoose = require('mongoose')
const tools = require('../utils/tools')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    'username': {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    'password': {
        type: String,
        required: true,
    },
    'name': String,
    'blogs':[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blogs'
        }
    ]
})

userSchema.set('toJSON',{
    transform: tools.transform
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('users',userSchema)