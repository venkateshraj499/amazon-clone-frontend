import { render } from "@testing-library/react";
import Component from "../Router";
import Cart from "../Cart";
import Product from "../Product";
import Filter from "../Filter";

describe("Home Component", () => {
  it("rendered", () => {
    const { getByTestId } = render(<Component />);
    const input = getByTestId("homepage");
    expect(input).toBeTruthy();
  });
});

describe("Cart Component", () => {
  it("rendered", () => {
    const { getByTestId } = render(<Cart />);
    const input = getByTestId("cart");
    expect(input).toBeTruthy();
  });
});
describe("Product Component", () => {
  it("rendered", () => {
    const { getByTestId } = render(<Product />);
    const input = getByTestId("product");
    expect({ input }).toBeTruthy();
  });
});

describe("Filter Component", () => {
  it("rendered", () => {
    const { getByTestId } = render(<Filter />);
    const input = getByTestId("filter");
    expect(input).toBeTruthy();
  });
});
