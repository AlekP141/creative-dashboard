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

      <p>Left Position: {left}px</p>
      <input
        className="sliderInputTrack"
        id={`${classes[0]}LeftRange`}
        type="range"
        min="0"
        max={width}
        value={left || 0}
        onChange={() => sliderChangeHandler({ direction: "Left" })}
      />
      <p>Top Position: {top}px</p>
      <input
        className="sliderInputTrack"
        id={`${classes[0]}TopRange`}
        type="range"
        min="0"
        max={height}
        value={top || 0}
        onChange={() => sliderChangeHandler({ direction: "Top" })}
      />
      <p>Font Size: {fontSize}</p>
      <p>Text:</p>
      <textarea
        id={`${classes[0]}TextArea`}
        value={newText === undefined ? text : newText}
        onChange={() => textChangeHandler()}
      />
      <p>{color}</p>
    </div>
  );
};

export default TextEdit;
