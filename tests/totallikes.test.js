const totalLikes = require("../utils/list_helper").totalLikes
const data = require("./test_data")

describe("totalLikes",()=>{
	test("of empty array is 0",()=>{
		expect(totalLikes([])).toBe(0)
	})

	test("of blogs with one blog is 5",()=>{
		expect(totalLikes(data.listWithOneBlog)).toBe(5)
	})

	test("of many blogs is right is 36",()=>{
		expect(totalLikes(data.blogs)).toBe(36)
	})
})