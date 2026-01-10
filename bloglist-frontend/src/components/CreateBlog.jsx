import { useState } from 'react'

const CreateBlog = ({ onCreate }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        onCreate({ title, author, url }) // La funcion que se le pasa es onCreate = handleCreate en App.jsx

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <>
            <h2> Create new Blog: </h2>
            <form onSubmit={handleSubmit}>
                <div> Title: <input value={title} onChange={({ target }) => setTitle(target.value)}></input> </div>
                <div> Author: <input value={author} onChange={({ target }) => setAuthor(target.value)}></input> </div>
                <div> Url: <input value={url} onChange={({ target }) => setUrl(target.value)}></input> </div>
                <button> Submit blog </button>
                <p></p>
            </form>
        </>
    )
}

export default CreateBlog