import { useState, useEffect } from "react";
import selectCreative from "../../functions/selectCreative";

interface ILogoEdit {
  classes: string;
  width: number;
  height: number;
}

const LogoEdit = ({ classes, width, height }: ILogoEdit) => {
  const creative = selectCreative();
  const targetClass = classes[0];
  const [left, setLeft] = useState<number>();
  const [top, setTop] = useState<number>();

  // Set initial values
  useEffect(() => {
    if (creative) {
      const targetElement = creative.querySelector(
        `.${targetClass}`
      ) as HTMLElement;
      const targetElementStyle = getComputedStyle(targetElement);
      setLeft(parseInt(targetElementStyle.left, 10));
      setTop(parseInt(targetElementStyle.top, 10));
    }
  }, [creative, classes]);

  // Update all values on any change
  useEffect(() => {
    const targetElement = creative?.querySelector(
      `.${classes[0]}`
    ) as HTMLElement;
    // console.log(targetElement)
    targetElement.style.left = `${left}px`;
    targetElement.style.top = `${top}px`;
  }, [creative, classes, left, top]);

  interface ISliderChangeHandler {
    direction: string;
  }

  const sliderChangeHandler = ({ direction }: ISliderChangeHandler) => {
    const rangeSlider = document.querySelector(
      `#${classes[0]}${direction}Range`
    ) as HTMLInputElement;
    switch (direction) {
      case "Left":
        setLeft(parseInt(rangeSlider.value));
        break;
      case "Top":
        setTop(parseInt(rangeSlider.value));
    }
  };
  return (
    <div className="logoEdit">
      <label htmlFor={`${classes[0]}LeftRange`}>Left Position: {left}px</label>
      <input
        className="sliderInputTrack"
        id={`${classes[0]}LeftRange`}
        type="range"
        min="0"
        max={width}
        value={left || 0}
        onChange={() => sliderChangeHandler({ direction: "Left" })}
      />

      <label htmlFor={`${classes[0]}TopRange`}>Top Position: {top}px</label>
      <input
        className="sliderInputTrack"
        id={`${classes[0]}TopRange`}
        type="range"
        min="0"
        max={height}
        value={top || 0}
        onChange={() => sliderChangeHandler({ direction: "Top" })}
      />
    </div>
  );
};

export default LogoEdit;
