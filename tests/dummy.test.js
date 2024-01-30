const dummy = require("../utils/list_helper").dummy

describe("dummy",()=>{
	test("of blogs is 1",()=>{
		expect(dummy([])).toBe(1)
	})
})