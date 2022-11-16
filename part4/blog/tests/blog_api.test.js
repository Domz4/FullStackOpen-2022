const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("get requests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs have id istead _id", async () => {
    const response = await api.get("/api/blogs");
    const ids = response.body.map((blog) => blog.id);
    for (const id of ids) {
      expect(id).toBeDefined();
    }
  });
});
describe("post requests", () => {
  let token = null;
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("12345", 10);
    const user = await new User({ username: "name", passwordHash }).save();

    const userForToken = { username: "name", id: user.id };
    return (token = jwt.sign(userForToken, config.SECRET));
  });

  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "test blog",
      author: "test blog",
      url: "test blog",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("test blog");
  });
  test("if the likes property is missing default value is 0", async () => {
    const newBlog = {
      title: "test blog",
      author: "test blog",
      url: "test blog",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });

  test("response status 400 if title and url are missing", async () => {
    const newBlog = {
      likes: 1,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});
describe("delete request", () => {
  test("delete blog test", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogsToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogsToDelete.id}`).expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const title = blogsAtEnd.map((e) => e.title);
    expect(title).not.toContain(blogsToDelete.title);
  });
});
describe("put request", () => {
  test("updating blog test", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogsToUpdate = blogsAtStart[0];
    console.log(blogsToUpdate);

    await api
      .put(`/api/blogs/${blogsToUpdate.id}`)
      .send({ likes: 10 })
      .expect(200);
    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd[0];
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    expect(updatedBlog.likes).toBe(10);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
