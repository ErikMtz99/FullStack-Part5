
const LoginForm = ({ username, password, onSubmit, onChangeUsername, onChangePassword }) => {
    return(
      <div>
      <h2>Login to the App: </h2>

      <form onSubmit={onSubmit}>
        <div> username <input value = {username} onChange={onChangeUsername}/> </div>
        <div> password <input value = {password} onChange={onChangePassword}/> </div>
        <button type="submit">login</button>
      </form>

      </div>
    )
  }

  export default LoginForm