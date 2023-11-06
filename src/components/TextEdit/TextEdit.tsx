import { useEffect, useState } from "react";
import selectCreative from "../../functions/selectCreative";
import "./TextEdit.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";

interface ITextEdit {
  classes: string;
  width: number;
  height: number;
}

const TextEdit = ({ classes, width, height }: ITextEdit) => {
  const creative = selectCreative();
  const targetClass = classes[0];
  // console.log(targetClass);
  const [left, setLeft] = useState<number>();
  const [top, setTop] = useState<number>();
  const [fontSize, setfontSize] = useState("");
  const [text, setText] = useState("");
  const [newText, setNewText] = useState<string>();
  const [color, setColor] = useState("");
  const [textAlign, setTextAlign] = useState("left");

  // Set initial values
  useEffect(() => {
    if (creative) {
      const targetElement = creative.querySelector(
        `.${targetClass}`
      ) as HTMLElement;
      const targetElementStyle = getComputedStyle(targetElement);
      console.log(targetElement.innerText);
      setLeft(parseInt(targetElementStyle.left, 10));
      setfontSize(targetElementStyle.fontSize);
      setTop(parseInt(targetElementStyle.top, 10));
      setText(targetElement.innerText);
      setColor(targetElementStyle.color);
      // console.log(targetElement.innerText)
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
    targetElement.style.fontSize = `${fontSize}px`;
    if (newText != undefined) {
      targetElement.innerText = newText;
    }
    targetElement.style.color = `#${color}`;
    targetElement.style.textAlign = textAlign;
    // console.log(textAlign)
  }, [creative, classes, left, fontSize, top, newText, color, textAlign]);

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

  const textChangeHandler = () => {
    const textArea = document.querySelector(
      `#${classes[0]}TextArea`
    ) as HTMLTextAreaElement;
    setNewText(textArea.value);
  };

  const fontSizeChangeHandler = () => {
    const fontSize = document.querySelector(`#${classes[0]}FontSize`) as HTMLInputElement;
    setfontSize(fontSize.value)
  }

  // // convert color to hex
  // const componentToHex = (c: number) => {
  //   const hex = c.toString(16);
  //   return hex.length == 1 ? "0" + hex : hex;
  // };

  // const rgbToHex = (r: number, g: number, b: number) => {
  //   return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  // };

  // useEffect(() => {
  //     const colorArray = color
  //     .replace(/^(rgb|rgba)\(/, "")
  //     .replace(/\)$/, "")
  //     .replace(/\s/g, "")
  //     .split(",");
  //     const [r, g, b] = [+colorArray[0], +colorArray[1], +colorArray[2]];
  //     console.log("r:" + r)
  //     console.log("g:" + g)
  //     console.log("b:" + b)
  //     console.log(rgbToHex(r, g, b));
  //     const hexColor = rgbToHex(r, g, b);
  //     console.log(hexColor);
  //     setColor(hexColor);
  // }, [color]);

  return (
    <div className="textEdit">
      <div className="textAlignGroup">
        <input
          className="radioInput"
          type="radio"
          name={`${classes[0]}TextAlign`}
          id={`${classes[0]}TextAlignLeft`}
          value="left"
          checked={textAlign === "left"}
          onChange={() => {
            setTextAlign("left");
          }}
        />
        <label
          className="textAlignLabel"
          htmlFor={`${classes[0]}TextAlignLeft`}
        >
          <FontAwesomeIcon icon={faAlignLeft} />
        </label>

        <input
          className="radioInput"
          type="radio"
          name={`${classes[0]}TextAlign`}
          id={`${classes[0]}TextAlignCenter`}
          value="center"
          checked={textAlign === "center"}
          onChange={() => {
            setTextAlign("center");
          }}
        />
        <label
          className="textAlignLabel"
          htmlFor={`${classes[0]}TextAlignCenter`}
        >
          <FontAwesomeIcon icon={faAlignCenter} />
        </label>

        <input
          className="radioInput"
          type="radio"
          name={`${classes[0]}TextAlign`}
          id={`${classes[0]}TextAlignRight`}
          value="right"
          checked={textAlign === "right"}
          onChange={() => {
            setTextAlign("right");
          }}
        />
        <label
          className="textAlignLabel"
          htmlFor={`${classes[0]}TextAlignRight`}
        >
          <FontAwesomeIcon icon={faAlignRight} />
        </label>
      </div>

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

      <label htmlFor={`${classes[0]}FontSize`}>Font Size:</label>
      <input className="fontSizeInput" type="text" name={`${classes[0]}FontSize`} id={`${classes[0]}FontSize`} value={fontSize} onChange={() => {fontSizeChangeHandler()}}/>

      <label htmlFor={`${classes[0]}TextArea`}>Text:</label>
      <textarea
        id={`${classes[0]}TextArea`}
        name={`${classes[0]}TextArea`}
        value={newText === undefined ? text : newText}
        onChange={() => textChangeHandler()}
      />
      {/* <input type="color" name={`${classes[0]}Color`} id={`${classes[0]}Color`} value={color} /> */}
    </div>
  );
};

export default TextEdit;
