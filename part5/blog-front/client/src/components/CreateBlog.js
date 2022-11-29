import { useState } from "react";

const CreateBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const handleCreate = (e) => {
    e.preventDefault();
    createBlog(newBlog.title, newBlog.author, newBlog.url);
    setNewBlog({ title: "", author: "", url: "" });
  };
  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form onSubmit={handleCreate}>
        <label>
          title:
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleChange}
          />
        </label>
        <label>
          author:
          <input
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleChange}
          />
        </label>
        <label>
          url:
          <input
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleChange}
          />
        </label>
        <button className="submit-btn" type="submit">Submit blog</button>
      </form>
    </>
  );
};

export default CreateBlog;
