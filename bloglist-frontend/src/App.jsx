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

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
  
  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({title, author, url,})
      
      setBlogs(prevBlogs => prevBlogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage('Blog added! ')
      setTimeout(() => setMessage(null), 3000)
      blogFormRef.current.toggleVisibility()
      
    } catch (exception) {
      setErrorMessage(' Missing information ')
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
      <Togglable buttonLabel='login'>
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
        <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
          <CreateBlog 
            onSubmit={handleCreate} 
            title = {title} 
            author = {author} 
            url = {url}
            titleChange={({target}) => setTitle(target.value)}
            authorChange={({target}) => setAuthor(target.value)}
            urlChange={({target}) => setUrl(target.value)}
          />
        </Togglable>

        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
        <p></p>
        <button type="submit" onClick={handleLogout}> logout </button>
      </>
    )}
  </div>
  )

}

export default App