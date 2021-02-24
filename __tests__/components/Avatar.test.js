import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Avatar from "../../src/components/Avatar";
import faker from "faker";
import { getAvatarFromName } from "../../src/modules/avatars";

describe("<Avatar />", () => {
  it("renders without crashing", () => {
    render(
      <Avatar
        user={{
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
        }}
      />
    );
  });
  it("generates image in avatar", () => {
    const imageUrl = "/static/images/avatar_1.png";
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const { getByAltText } = render(
      <Avatar
        user={{
          firstname: firstName,
          lastname: lastName,
          url: imageUrl,
        }}
      />
    );
    expect(
      getByAltText(`${firstName} ${lastName}`).src.endsWith(imageUrl)
    ).toBe(true);
  });
  it("generates text in avatar when image is not defined", () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const { getByText } = render(
      <Avatar
        user={{
          firstname: firstName,
          lastname: lastName,
        }}
      />
    );
    expect(
      getByText(getAvatarFromName(firstName, lastName))
    ).toBeInTheDocument();
  });
  it("returns null if user is not defined", () => {
    const { container } = render(<Avatar />);
    expect(container).toBeEmptyDOMElement();
  });
});
