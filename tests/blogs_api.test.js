const supertest = require("supertest")
const blogModel = require("../models/blog")
const data = require("./test_data")
const app = require("../app")
const api = supertest(app)

describe('Api Tests Running',()=>{
    beforeEach(async()=>{
        await blogModel.deleteMany()
        const blogs = data.blogs.map(blog=>{
            return {
                author: blog.author,
                url: blog.url,
                title: blog.title,
                likes:blog.likes
            }
        })
        const blogSavePromises = blogs.map(blog=>new blogModel(blog).save())
        await Promise.all(blogSavePromises)
        console.log('All blogs saved before test')
    },100000)
    test('get all blogs,expected length:6',async()=>{
        const response = await api.get('/api/blogs').expect(200).expect('Content-Type',/application\/json/)
        expect(response.body).toHaveLength(6)
    })
    test('Returned blogs have property id',async()=>{
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
    test('Blog is created and length increased',async()=>{
        const postRequest = await api.post('/api/blogs').send(data.listWithOneBlog[0])
        expect(postRequest.status).toBe(201)
        const getPosts = await api.get('/api/blogs')
        expect(getPosts.body).toHaveLength(data.blogs.length+1)
    })
    test('Sending blog without likes and should default to zero',async()=>{
        const postRequest = await api.post('/api/blogs').send(data.blogWithoutLikes[0])
        expect(postRequest.status).toBe(201)
        expect(postRequest.body.likes).toBe(0)
    })
    test('Blog without title and url must be bad request',async()=>{
        const postRequest = await api.post('/api/blogs').send(data.blogWithoutTitle)
        expect(postRequest.status).toBe(400)

        const postRequest2 = await api.post('/api/blogs').send(data.blogWithoutUrl)
        expect(postRequest2.status).toBe(400)
    })
    test('deleting blog should return response code of 202',async()=>{
		
        const blogs = await api.get('/api/blogs')
        const idToDelete = blogs.body[0].id
        const deleteRequest = await api.delete(`/api/blogs/${idToDelete}`)
        console.log(deleteRequest.status)
        expect(deleteRequest.status).toBe(202)
        
        // again putting delete request should be 404
        const deleteRequest2 = await api.delete(`/api/blogs/${idToDelete}`)
        expect(deleteRequest2.status).toBe(404)
    })
    test('number of likes should be updated',async()=>{
        const blogs = await api.get('/api/blogs')
        console.log('blogs got',blogs.body)
        const blog = blogs.body[0]
        const idToUpdate = blog.id
        newLikes = blog.likes+1
        blog.likes = newLikes
        const updateRequest = await api.put(`/api/blogs/${idToUpdate}`).send(blog) 
        if(updateRequest){
            console.log('updatedBlog',updateRequest.body)
            expect(updateRequest.body.likes).toBe(newLikes)
            expect(updateRequest.status).toBe(200)
        }
        else{
            expect(updateRequest.status).toBe(404)
        }

        // new likes count
        // const upatedBlog = await api.get(`/api/blogs/${idToUpdate}`)
        // expect(upatedBlog.likes).toBe(newLikes)


    })
})