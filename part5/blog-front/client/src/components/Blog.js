import { useState } from "react";

const BlogComponent = ({ blog, addLike, removeBlog }) => {
  const [view, setView] = useState(false);
  const toggleVisibility = () => {
    setView(!view);
  };
  const handleLike = () => {
    const blogUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    addLike(blog.id, blogUpdate);
  };
  const handleRemove = () => {
    removeBlog(blog.id);
  };

  return (
    <div className="blog">
      <div>
        <p className="blogTitle">{blog.title}</p>
        <p className="blogAuthor">{blog.author}</p>
        <button onClick={toggleVisibility}> {view ? "hide" : "show"}</button>
      </div>
      {view && (
        <div>
          <br />
          <p className="blogLikes">likes: {blog.likes}</p>
          <button className="like-btn" onClick={handleLike}>
            like
          </button>
          <p className="blogUrl">{blog.url}</p>
          <button className="del-btn" onClick={handleRemove}>
            remove
          </button>
        </div>
      )}
    </div>
  );
};
export default BlogComponent;
