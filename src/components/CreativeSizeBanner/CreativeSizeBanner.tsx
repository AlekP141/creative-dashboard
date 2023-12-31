import { FormEvent, useState, useRef, useEffect } from "react";
import "./CreativeSizeBanner.scss";

interface ICreativeSizeBanner {
  selectedSize: string;
  onSelectedSize: (size: string) => void;
}

const CreativeSizeBanner = ({
  selectedSize,
  onSelectedSize,
}: ICreativeSizeBanner) => {
  const [creativeSizes, setCreativeSizes] = useState(["300x600", "300x250", "320x50", "468x60"]);
  const creativeSizeHeightRef = useRef<HTMLInputElement>(null);
  const creativeSizeWidthRef = useRef<HTMLInputElement>(null);

  const addNewCreativeHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newHeight = creativeSizeHeightRef.current?.value;
    const newWidth = creativeSizeWidthRef.current?.value;

    if (newHeight && newWidth) {
      const newSize = `${newHeight}x${newWidth}`;
      setCreativeSizes([...creativeSizes, newSize]);

      creativeSizeHeightRef.current.value = "";
      creativeSizeWidthRef.current.value = "";
    }
  };

  useEffect(() => {
    onSelectedSize(creativeSizes[0]);
  }, []);

  return (
    <div className="creativeSizeContainer">
      <ul className="creativeSizeList">
        {creativeSizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <li
              key={size}
              onClick={() => {
                onSelectedSize(size);
              }}
              className={`creativeSize ${isSelected ? "selectedSize" : "notSelected"}`}
            >
              {size}
            </li>
          );
        })}
        <li
          className="addNewCreativeSize"
          onClick={() => {
            const addSizeForm = document.querySelector(
              ".addSizeForm"
            ) as HTMLElement;
            const addSizeButton = document.querySelector(
              ".addNewCreativeSize"
            ) as HTMLElement;
            addSizeForm.style.display = "flex";
            addSizeButton.style.display = "none";
          }}
        >
          +
        </li>
        <form className="addSizeForm" onSubmit={addNewCreativeHandler}>
          <input
            ref={creativeSizeHeightRef}
            type="text"
            placeholder="Height"
          ></input>
          <input
            ref={creativeSizeWidthRef}
            type="text"
            placeholder="Width"
          ></input>
          <button type="submit">Add</button>
          <button
            className="formClose"
            onClick={() => {
              const addSizeForm = document.querySelector(
                ".addSizeForm"
              ) as HTMLElement;
              const addSizeButton = document.querySelector(
                ".addNewCreativeSize"
              ) as HTMLElement;
              addSizeForm.style.display = "none";
              addSizeButton.style.display = "block";
            }}
          >
            x
          </button>
        </form>
      </ul>
    </div>
  );
};

export default CreativeSizeBanner;
