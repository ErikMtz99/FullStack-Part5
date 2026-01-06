const CreateBlog = ({onSubmit, title, author, url, titleChange, authorChange, urlChange}) => {
    return (
        <>
            <h2> Create new Blog: </h2>
            <form onSubmit={onSubmit}>
                <div> Title: <input value={title} onChange={titleChange}></input> </div>
                <div> Author: <input value={author} onChange={authorChange}></input> </div>
                <div> Url: <input value={url} onChange={urlChange}></input> </div>
                <button> Create </button>
                <p></p>
            </form>
        </>
    )
}

export default CreateBlog