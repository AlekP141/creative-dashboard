import { useEffect, useState } from "react";
import selectCreative from "../../functions/selectCreative";

interface ITextEdit {
  classes: string;
}

const TextEdit = ({ classes }: ITextEdit) => {
  const creative = selectCreative();
  const targetClass = classes[0];
  console.log(targetClass);
  const [left, setLeft] = useState("");
  const [fontSize, setfontSize] = useState("");
  const [top, setTop] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (creative) {
      const targetElement = creative.querySelector(`.${classes[0]}`) as HTMLElement;
      console.log(targetElement)
      setLeft(targetElement.style.left)
      setfontSize(targetElement.style.fontSize)
      setTop(targetElement.style.top)
      setText(targetElement.innerText)
      setColor(targetElement.style.color);
    }
  }, [creative, classes])

  useEffect(() => {
    console.log(left)
    console.log(fontSize)
    console.log(top)
    console.log(text)
    console.log(color)
  }, [left, fontSize, top, text, color])

  if (creative) {
    const targetElement = creative.querySelector(`.${classes[0]}`) as HTMLElement;
  }

  return <div className="textEdit">
    <p>{left}</p>
    <p>{fontSize}</p>
    <p>{top}</p>
    <p>{text}</p>
    <p>{color}</p>
  </div>;
};

export default TextEdit;
