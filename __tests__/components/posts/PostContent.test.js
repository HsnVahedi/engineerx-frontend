import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PostContent from "../../../src/components/posts/PostContent";
import faker from "faker";

let post;

describe("<PostContent />", () => {
  beforeAll(() => {
    post = {
      title: faker.lorem.word(),
      sections: [],
      tags: [],
    };
  });
  it("renders without crashing", () => {
    render(<PostContent post={post} />);
  });
  it("renders title in <h1 />", () => {
    const { container } = render(<PostContent post={post} />);
    expect(container.querySelector("h1").innerHTML).toBe(post.title);
  });
});
