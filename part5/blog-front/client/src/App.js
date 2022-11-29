import { useState, useEffect, useRef } from "react";
//css
import "./styles.css";
//components import
import BlogComponent from "./components/Blog";
import LoginComponent from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable ";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [msg, setMsg] = useState(null);
  const [user, setUser] = useState(null);

  const blogRef = useRef();
  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [msg]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createBlog = async (title, author, url) => {
    try {
      const createService = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(createService));
      setMsg(`succesfuly added ${title} by ${author}`);
    } catch (exception) {
      setMsg(`error ${exception.response.data.error}`);
    }
  };
  const addLike = async (id, blogUpdate) => {
    try {
      const updateService = await blogService.update(id, blogUpdate);
      setBlogs(blogs.map((blog) => (blog.id === id ? updateService : blog)));
    } catch (exception) {
      setMsg(`error ${exception.response.data.error}`);
    }
  };
  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setMsg("Blog was successfully removed");
    } catch (exception) {
      setMsg(`error ${exception.response.data.error}`);
    }
  };
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setMsg(`succesfully loged in as ${user.username}`);
    } catch (exception) {
      setMsg(`error ${exception.response.data.error}`);
    }
  };
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };
  return (
    <div>
      <h2>blogs</h2>
      <Notification msg={msg} />
      {user === null ? (
        <LoginComponent handleLogin={handleLogin} />
      ) : (
        <div>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable
            buttonLabel="create"
            buttonLabelSecond="cancel"
            ref={blogRef}
          >
            <CreateBlog createBlog={createBlog} />
          </Togglable>
          <div className="blogs">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <BlogComponent
                  key={blog.id}
                  blog={blog}
                  addLike={addLike}
                  removeBlog={removeBlog}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
