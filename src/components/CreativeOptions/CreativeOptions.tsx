import "./CreativeOptions.scss";
import { useEffect, useState } from "react";

const CreativeOptions = () => {
  const [creativeHeight, setCreativeHeight] = useState<number>(0);
  const [creativeWidth, setCreativeWidth] = useState<number>(0);
  const iframe = document.getElementById("iframe") as HTMLIFrameElement;
  let creative: Document | null = null;
  if (iframe && iframe.contentDocument) {
    creative = iframe.contentDocument;
  }

  interface IClassNames {
    [key: number]: string[]
  }

  const extractClassNames = (element: HTMLElement, classNames: IClassNames = {}, hashValue = 0) => {

    console.dir(element.classList)
    console.log(typeof(element.className))
    if (element && element.classList.length != 0) {
      const classes = Array.from(element.classList)
      classNames[hashValue] = classes;
    }

    if (element && element.children) {
      const childrenArray = Array.from(element.children);
      const keys = Object.keys(classNames);
      hashValue = Number(keys[keys.length - 1]) + 1;

      childrenArray.forEach((el) => {
        classNames = extractClassNames(el as HTMLElement, classNames, hashValue);
        hashValue++;
      });
    }

    return classNames;
  };

  useEffect(() => {
    if (creative) {
      const body = creative.querySelector("body") as HTMLBodyElement;
      const newHeight = body.offsetHeight - 2;
      const newWidth = body.offsetWidth - 2;
      setCreativeHeight(newHeight);
      setCreativeWidth(newWidth);

      const backgroundImage = creative.querySelector(".backgroundImage") as HTMLElement
      console.log(extractClassNames(backgroundImage))
    }
  }, [creative]);

  useEffect(() => {
    console.log(creativeHeight);
    console.log(creativeWidth);
  }, [creativeHeight, creativeWidth]);

  return (
    <div className="optionsContainer">
      <h2 className="optionsTitle">Options</h2>
      <form action="">
        <h4></h4>
      </form>
    </div>
  );
};

export default CreativeOptions;
