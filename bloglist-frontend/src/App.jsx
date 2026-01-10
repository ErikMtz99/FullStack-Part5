import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage]=useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)



  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with: ',username, password)
    try {
      const user = await loginService.login({username, password,})

      //Save the user credentials in the local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      setUser(user)
      blogService.setToken(user.token)

      setUsername('')
      setPassword('')
      setMessage('Logged In!')
      setTimeout(() => setMessage(null), 4000)

    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {setErrorMessage(null)}, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }
  
  const handleCreate = async (blogObject) => {

    try {
      const newBlog = await blogService.create(blogObject)
      
      setBlogs(prevBlogs => prevBlogs.concat(newBlog))
      setMessage('Blog added! ')
      setTimeout(() => setMessage(null), 3000)

      blogFormRef.current.toggleVisibility()

    } catch (exception) {
      setErrorMessage(' Missing information ')
      setTimeout(() => setErrorMessage(null), 3000)
    }
  }

  const handleLikes = async (blogObject) => {
    try{
      console.log('BLOG RECIBIDO:', blogObject)

      const updatedBlog = {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        likes: blogObject.likes + 1,
        user: blogObject.user.id || blogObject.user
      }
      const returnedBlog = await blogService.update(blogObject.id, updatedBlog)

      setBlogs(blogs.map(b =>
      b.id === returnedBlog.id ? returnedBlog : b
      ))

      setMessage('Blog updated! ')
      setTimeout(() => setMessage(null), 3000)

    }catch (exception){
      console.log(exception.response.data)
      setErrorMessage(' Error updating blog ')
      setTimeout(() => setErrorMessage(null), 3000)
    }
  }

  return (
  <div>
    {/* Notifications siempre visibles */}
    <Notification message={message} type="success" />
    <Notification message={errorMessage} type="error" />

    {user === null ? 
      (
      <div>
      <Togglable buttonLabel1='login' buttonLabel2='cancel'>
        <LoginForm 
        username={username} 
        password={password} 
        onSubmit={handleLogin} 
        onChangeUsername={({ target }) => setUsername(target.value)}
        onChangePassword={({ target }) => setPassword(target.value)}
        />
      </Togglable>
      </div>
      ) : (
      <>
        <h2>Blogs</h2>
        <p>{user.name} logged-in</p>
        <Togglable buttonLabel1='Create new blog' buttonLabel2='cancel' ref={blogFormRef}>
          <CreateBlog onCreate={handleCreate}/>
        </Togglable>

        {[...blogs] //Se crea una copia de blogs para no mutar directamente
        .sort((a,b)=> b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} addLike={() => handleLikes(blog)}/>
        ))}
        
        <p></p>
        <button type="submit" onClick={handleLogout}> logout </button>
      </>
    )}
  </div>
  )

}

export default App