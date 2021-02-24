import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Section } from "../../../src/components/posts/PostContent";
import faker from "faker";

let section;

describe("<Section />", () => {
  beforeAll(() => {
    section = {
      title: faker.lorem.word(),
      blocks: [],
    };
  });
  it("renders without crashing", () => {
    render(<Section section={section} />);
  });
  it("renders title in <h2 />", () => {
    const { container } = render(<Section section={section} />);
    expect(container.querySelector("h2").innerHTML).toBe(section.title);
  });
  it("returns null when section is not defined", () => {
    const { container } = render(<Section />);
    expect(container).toBeEmptyDOMElement();
  });
});
