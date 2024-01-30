const mostLikes = require("../utils/list_helper").mostLikes
const data = require("./test_data")

describe("most likes",()=>{
	const result = {
		author: "Edsger W. Dijkstra",
		likes: 17
	}
	test("of many blogs is correct",()=>{
		expect(mostLikes(data.blogs)).toEqual(result)
	})
})