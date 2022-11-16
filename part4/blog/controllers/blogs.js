const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
<<<<<<< HEAD
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const user = request.user;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!(token && decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blog = await new Blog({
=======

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
>>>>>>> 916c54219680dfb64e3f87aafe43fc3595966509
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
<<<<<<< HEAD
    user: user._id,
  }).populate("user", { username: 1, name: 1 });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const user = request.user;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!(token && decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const id = request.params.id;
  const blog = await Blog.findById(id);

  if (blog.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: id });
    response.sendStatus(204).end();
  } else {
    response.status(401).json({ error: "unauthorized operation" });
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = request.body;
  const id = request.params.id;

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });

  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(404).end();
=======
  });

  blog
    .save()
    .then((savedBlog) => {
      response.json(savedBlog);
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/:id", (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

blogsRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
>>>>>>> 916c54219680dfb64e3f87aafe43fc3595966509
});
module.exports = blogsRouter;
