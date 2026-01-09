import { useState, forwardRef,useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => { // Hook de react que se usa para definir funciones en un componente que se pueden invocar fuera del componente
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel1}</button>
      </div>
      <div style={showWhenVisible}>
        <div>
        {props.children}
        </div>
        <button onClick={toggleVisibility}>{props.buttonLabel2}</button>
      </div>
    </div>
  )
})

export default Togglable