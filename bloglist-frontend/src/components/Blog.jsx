import Togglable from "./Togglable"

const Blog = ({ blog, addLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
  <div style={blogStyle}>
    {blog.title} 
    <br></br>
    <Togglable buttonLabel1='view' buttonLabel2='hide'>
      {blog.url}
      <br></br>
      {blog.likes}
      <button onClick={addLike}>like</button>
      <br></br>
      {blog.author}
      <br></br>
    </Togglable>
  </div>
)}

export default Blog