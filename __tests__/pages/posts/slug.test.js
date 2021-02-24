import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Post } from "../../../pages/posts/[slug]";
import faker from "faker";
import { ExpansionPanelActions } from "@material-ui/core";

let post;

describe("App", () => {
  beforeAll(() => {
    post = {
      title: faker.lorem.word(),
      sections: [],
      tags: [],
      owner: {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
      },
    };
  });
  it("renders without crashing", () => {
    render(<Post post={post} />);
  });
  it("renders only one <h1 /> which contains the post's title", () => {
    const { container } = render(<Post post={post} />);
    const h1Tags = container.querySelectorAll("h1");
    expect(h1Tags.length).toBe(1);
    const h1Tag = h1Tags[0];
    expect(h1Tag.innerHTML).toBe(post.title);
  });
});
