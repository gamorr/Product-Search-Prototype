import { render } from "@testing-library/react";
import App from "./App";

jest.mock("./family_fare_img.webp", () => ({
  default: "data:image/webp;base64,",
}));

test("app renders correctly", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
