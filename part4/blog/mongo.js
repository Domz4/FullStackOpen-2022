const mongoose = require("mongoose");


if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://domino:${password}@blog.rrxobzm.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog({
  title: "Tear Along the Dotted Line",
  author: "Zerocalcare",
  url: "https://en.wikipedia.org/wiki/Tear_Along_the_Dotted_Line",
  likes: 62330,
});

if (false) {
  blog.save().then(() => {
    console.log("blog saved!");
    mongoose.connection.close();
  });
}

Blog.find({}).then((result) => {
  result.forEach((blog) => {
    console.log(blog);
  });
  mongoose.connection.close();
});
