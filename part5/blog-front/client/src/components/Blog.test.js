import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogComponent from "./Blog";
import userEvent from "@testing-library/user-event";

describe("blogComponent tests", () => {
  const blog = {
    title: "Tear Along the Dotted Line",
    author: "Zerocalcare",
    url: "https://en.wikipedia.org/wiki/Tear_Along_the_Dotted_Line",
    likes: 1,
    user: {
      username: "username",
      name: "name",
    },
  };
  let component;
  const likeMockHandler = jest.fn();
  beforeEach(() => {
    component = render(
      <BlogComponent key={blog.id} blog={blog} addLike={likeMockHandler} />
    );
  });
  test("renders title and author but not the url and number of likes", () => {
    const elem = component.container;
    expect(elem.querySelector(".blogTitle")).toHaveTextContent(blog.title);
    expect(elem.querySelector(".blogAuthor")).toHaveTextContent(blog.author);
    expect(elem.querySelector(".blogLikes")).not.toBeInTheDocument();
    expect(elem.querySelector(".blogUrl")).not.toBeInTheDocument();
  });

  test("renders url and likes when show button is clicked", async () => {
    const elem = component.container;
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    expect(elem.querySelector(".blogLikes")).toHaveTextContent(blog.likes);
    expect(elem.querySelector(".blogUrl")).toHaveTextContent(blog.url);
  });
  test("when like button is clicked twice handler is called twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);
    const likeButton = component.container.querySelector("#like-btn");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });
});
