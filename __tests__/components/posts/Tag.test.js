import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Tag from "../../../src/components/posts/Tag";
import faker from "faker";

describe("<Tag />", () => {
  it("renders without crashing", () => {
    render(<Tag tagname={faker.lorem.word()} />);
  });
  it("displays the appropriate tag", () => {
    const tag = faker.lorem.word();
    const { getByText } = render(<Tag tagname={tag} />);
    expect(getByText(tag)).toBeInTheDocument();
  });
  it("renders anchor element correctly", () => {
    const tag = faker.lorem.word();
    const { getByText } = render(<Tag tagname={tag} />);
    expect(getByText(tag).closest("a")).toHaveAttribute(
      "href",
      `/posts/tags/${tag}`
    );
  });
  it("returns null when tagname is not passed", () => {
    const { container } = render(<Tag />);
    expect(container).toBeEmptyDOMElement();
  });
  it("returns null when tagname is empty string", () => {
    const { container } = render(<Tag tagname="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
