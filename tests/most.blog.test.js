const mostBlog = require("../utils/list_helper").mostBlog
const data = require("./test_data")

describe("most blog",()=>{
	const result = {
		author: "Robert C. Martin",
		blogs: 3
	}
	test("of many blogs is correct",()=>{
		expect(mostBlog(data.blogs)).toEqual(result)
	})
})