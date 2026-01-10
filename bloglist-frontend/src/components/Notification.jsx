import { useState,useEffect } from 'react'

const Notification = ({ message , type }) => {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if(message) {
            setVisible(true)
        } else{
            // 400ms pass before setting visible to false, allowing animation to run. After that time, visible is false, and the return of Notification is null, hence not showing anything.
            const timeout = setTimeout(() => {setVisible(false)}, 400)
            // this is to handle multiple timeouts and not get confused.
            return () => clearTimeout(timeout)
        }
    }, [message]) //Executes every time message changes

    if (!message && !visible) return null

    return (
      <div className={`notification ${type} ${!message ? 'hide':''}`}> {/* If message is false, hide is added to class */}
        {message}
      </div>
    )
  }

export default Notification