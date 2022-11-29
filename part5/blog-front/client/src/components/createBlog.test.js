import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import CreateBlog from "./CreateBlog";
import userEvent from "@testing-library/user-event";

test("createblog call handler when provided with right props", async () => {
  const createMockHandler = jest.fn();
  const component = render(<CreateBlog createBlog={createMockHandler} />);
  const elem = component.container;
  const user = userEvent.setup();
  const button = elem.querySelector(".submit-btn");

  const titleInput = elem.querySelector('input[name="title"]');
  const authorInput = elem.querySelector('input[name="author"]');
  const urlInput = elem.querySelector('input[name="url"]');

  await user.type(titleInput, "title");
  await user.type(authorInput, "author");
  await user.type(urlInput, "url");
  await user.click(button);
  
  expect(createMockHandler.mock.calls).toHaveLength(1);
  expect(createMockHandler.mock.calls[0][0]).toBe("title");
  expect(createMockHandler.mock.calls[0][1]).toBe("author");
  expect(createMockHandler.mock.calls[0][2]).toBe("url");
});
