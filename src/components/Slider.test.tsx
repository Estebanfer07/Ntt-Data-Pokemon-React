import { Slider } from "./Slider";
import { render } from "@testing-library/react";
describe("Slider Component", () => {
  test("should calculate thumb position", () => {
    const { container: container1 } = render(
      <Slider controlName="test" onChange={() => {}} value={0} />
    );
    let thumb = container1.getElementsByClassName("slider_thumb");
    expect(thumb.item(0)).toHaveStyle("left:0");

    const { container: container2 } = render(
      <Slider controlName="test" onChange={() => {}} value={10} />
    );
    thumb = container2.getElementsByClassName("slider_thumb");
    expect(thumb.item(0)).toHaveStyle("left:19.5px");

    // const sliderInput = screen.getByRole("slider");
    // fireEvent.change(sliderInput, { target: { name: "test", value: 0 } });
  });
});
