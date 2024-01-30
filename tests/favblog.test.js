const favBlog = require("../utils/list_helper").favourteBlog
const data = require("./test_data")

describe("fav blog",()=>{
	const result = {
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		likes: 12,
	}
	test("many blogs is corect",()=>{
		expect(favBlog(data.blogs)).toEqual(result)
	})
})