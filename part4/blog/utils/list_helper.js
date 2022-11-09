const dummy = () => {
  return 1;
};
const totalLikes = (blogs) => {
  return blogs.reduce((sum, num) => {
    return sum + num.likes;
  }, 0);
};
const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce(
        (current, next) => (current.likes < next.likes ? next : current),
        { likes: -1 }
      );
};
const mostBlogs = (blogs) => {
  const result = blogs.reduce((current, next) => {
    return current.blogs < next.blogs ? next : current;
  });

  return result.author;
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};

console.log(
  mostBlogs([
    {
      author: "Aobert C. Martin",
      blogs: 6,
    },
    {
      author: "Bobasddsaert C. Martin",
      blogs: 5,
    },
    {
      author: "CDobasddsaert C. Martin",
      blogs: 6,
    },
    {
      author: "Dobasddsaert C. Martin",
      blogs: 2,
    },
  ])
);
