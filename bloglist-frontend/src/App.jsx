import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage]=useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {setErrorMessage(null)}, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const loginForm = () => {
    return(
      <div>
      <h2>Login to the App: </h2>

      <form onSubmit={handleLogin}>
        <div> username <input value = {username} onChange={({ target }) => setUsername(target.value)}/> </div>
        <div> password <input value = {password} onChange={({ target }) => setPassword(target.value)}/> </div>
        <button type="submit">login</button>
      </form>

      </div>
    )
  }

  return (
  <div>
    {/* Notifications siempre visibles */}
    <Notification message={message} type="success" />
    <Notification message={errorMessage} type="error" />

    {user === null ? (
      loginForm()
    ) : (
      <>
        <h2>blogs</h2>
        <p>{user.name} logged-in</p>

        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}

        <button type="submit" onClick={handleLogout}> logout </button>
      </>
    )}
  </div>
  )

}

export default App