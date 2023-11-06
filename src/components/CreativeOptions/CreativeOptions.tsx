import "./CreativeOptions.scss";
import { useLayoutEffect, useState } from "react";
import OptionsList from "../OptionsList/OptionsList";

interface ICreativeOptions {
  selectedSize: string;
  creative: Document | undefined;
}

const CreativeOptions = ({ selectedSize, creative }: ICreativeOptions) => {
  const [classNames, setClassNames] = useState({});
  const [selectedSizeObject, setSelectedSizeObject] = useState({
    width: "300",
    height: "600",
  });

  // Define function for extracting classes from creatives
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

  // Convert selectedSize into object with height/width
  useLayoutEffect(() => {
    const splitSize = selectedSize.split("x");
    setSelectedSizeObject({ width: splitSize[0], height: splitSize[1] });

    if (creative) {
      const container = creative.querySelector(".container") as HTMLElement;

      setClassNames(extractClassNames(container));
    }
  }, [creative]);

  const [allClasses, setAllClasses] = useState<string[]>();

  useLayoutEffect(() => {
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
            creativeHeight={Number(selectedSizeObject.height)}
            creativeWidth={Number(selectedSizeObject.width)}
          />
        ))
      ) : (
        <p>No classes found.</p>
      )}
    </div>
  );
};

export default CreativeOptions;
