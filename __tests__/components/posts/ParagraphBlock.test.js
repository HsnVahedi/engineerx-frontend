import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ParagraphBlock } from "../../../src/components/posts/blocks/ParagraphBlock";

describe("<ParagraphBlock />", () => {
  it("renders without crashing", () => {
    render(<ParagraphBlock block={{ paragraph: "<p>Hello</p>" }} />);
  });
  it("wraps given html in a <div />", () => {
    const html = "<p>Hello</p>";
    const { container } = render(
      <ParagraphBlock block={{ paragraph: html }} />
    );
    expect(container.querySelector("div").innerHTML).toBe(html);
  });
});
