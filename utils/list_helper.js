const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const getTotalLikes = blogs => {
		const reducer = (sum,blog) => sum + blog.likes
		return blogs.reduce(reducer,0)
	}
	var totalLikes = blogs.length === 0 ? 0 : getTotalLikes(blogs)
	return totalLikes
}

const favourteBlog = (blogs) => {
	const reducer = (favBlog,blog) => {
		if(favBlog.likes<blog.likes){
			return blog
		}
		return favBlog
	}
	const favBlog = blogs.reduce(reducer,blogs[0])
	delete favBlog._id
	delete favBlog.__v
	delete favBlog.url
	return favBlog
}

const mostBlog = blogs => {
	
	const new_blogs = [...new Set(blogs.map(blog=>blog.author))].map(author=>{
		return {
			author: author,
			blogs: blogs.filter(iblog=>iblog.author===author).length,
		}
	})
	
	const mostBlogFound = new_blogs.reduce((mostBlog,blog)=>{
		if(blog.blogs>mostBlog.blogs){
			return blog
		}
		return mostBlog
	},new_blogs[0])

	return mostBlogFound
}

const mostLikes = blogs => {
	const authors = [...new Set(blogs.map(blog=>blog.author))]
	const mostLikes = authors.map(author=>{
		return {
			author: author,
			likes: totalLikes(blogs.filter(blog=>blog.author===author))
		}
	})
	return favourteBlog(mostLikes)

}


module.exports = {
	dummy,
	totalLikes,
	favourteBlog,
	mostBlog,
	mostLikes,
}