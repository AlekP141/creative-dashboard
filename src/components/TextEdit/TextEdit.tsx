import { useEffect, useState } from "react";
import selectCreative from "../../functions/selectCreative";
import "./TextEdit.scss";

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
  const [top, setTop] = useState("");
  const [fontSize, setfontSize] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (creative) {
      const targetElement = creative.querySelector(
        `.${targetClass}`
      ) as HTMLElement;
      const targetElementStyle = getComputedStyle(targetElement)
      setLeft(parseInt(targetElementStyle.left, 10));
      setfontSize(targetElementStyle.fontSize);
      setTop(targetElementStyle.top);
      setText(targetElement.innerText);
      setColor(targetElementStyle.color);
      // console.log(targetElement.innerText)
    }
  }, [creative, classes]);

  useEffect(() => {
    const targetElement = creative?.querySelector(
      `.${classes[0]}`
    ) as HTMLElement;
    // console.log(targetElement)
    targetElement.style.left=`${left}px`
    targetElement.style.top=`${top}px`
    targetElement.style.fontSize=`${fontSize}px`
    targetElement.style.color=text
    targetElement.style.color=`#${color}`
  }, [left, fontSize, top, text, color]);

  if (creative) {
    const targetElement = creative.querySelector(
      `.${classes[0]}`
    ) as HTMLElement;
  }

  const sliderChangeHandler = () => {
    const rangeSlider = document.querySelector(`#${classes[0]}Range`) as HTMLInputElement;
    setLeft(parseInt(rangeSlider.value))
  }

  return (
    <div className="textEdit">
      <p>{left}px</p>
      <input className="sliderInputTrack" id={`${classes[0]}Range`} type="range" min="0" max={width} value={left || 0} onChange={sliderChangeHandler}/>
      <p>{top}</p>
      <p>{fontSize}</p>
      <p>{text}</p>
      <p>{color}</p>
    </div>
  );
};

export default TextEdit;
