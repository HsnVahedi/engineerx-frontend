import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ImageBlock } from "../../../src/components/posts/PostContent";
import faker from "faker";

let image;

describe("<ImageBlock />", () => {
  beforeAll(() => {
    image = {
      url: "/static/images/avatar_1.png",
      alt: faker.lorem.word(),
      width: 300,
      height: 300,
    };
  });
  it("renders without crashing", () => {
    render(<ImageBlock block={{ paragraph: "<p>Hello</p>", image }} />);
  });
  it("renders when paragraph is not defined", () => {
    render(<ImageBlock block={{ image }} />);
  });
  //   it("wraps given html in a <div />", () => {
  //     const html = "<p>Hello</p>";
  //     const { container } = render(
  //       <ParagraphBlock block={{ paragraph: html }} />
  //     );
  //     expect(container.querySelector("div").innerHTML).toBe(html);
  //   });
});
