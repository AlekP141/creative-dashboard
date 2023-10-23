import "./CreativeOptions.scss";
import { useEffect, useState } from "react";
import OptionsList from "../OptionsList/OptionsList"

const CreativeOptions = () => {
  const [creativeHeight, setCreativeHeight] = useState<number>(0);
  const [creativeWidth, setCreativeWidth] = useState<number>(0);
  const [classNames, setClassNames] = useState({});
  const iframe = document.getElementById("iframe") as HTMLIFrameElement;

  let creative: Document | null = null;
  if (iframe && iframe.contentDocument) {
    creative = iframe.contentDocument;
  }

  interface IClassNames {
    [key: number]: string[];
  }

  const extractClassNames = (
    element: HTMLElement,
    classNames: IClassNames = {},
    hashValue = 0
  ) => {
    if (element && element.classList.length != 0) {
      const classes = Array.from(element.classList);
      classNames[hashValue] = classes;
    }

    if (element && element.children) {
      const childrenArray = Array.from(element.children);
      const keys = Object.keys(classNames);
      hashValue = Number(keys[keys.length - 1]) + 1;

      childrenArray.forEach((el) => {
        classNames = extractClassNames(
          el as HTMLElement,
          classNames,
          hashValue
        );
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

      const container = creative.querySelector(".container") as HTMLElement;

      setClassNames(extractClassNames(container));
    }
  }, [creative]);

  const [allClasses, setAllClasses] = useState<string[]>();

  useEffect(() => {
    if (classNames) {
      setAllClasses(Object.values(classNames));
    }
  }, [classNames]);

  return (
    <div className="optionsContainer">
      <h2 className="optionsTitle">Options</h2>
      {allClasses && allClasses.length > 0 ? (
        allClasses.map((classGroup) => (
          <OptionsList
            key={classGroup[0]}
            classes={classGroup}
            creativeHeight={creativeHeight}
            creativeWidth={creativeWidth}
          />
        ))
      ) : (
        <p>No classes found.</p>
      )}
    </div>
  );
};

export default CreativeOptions;
