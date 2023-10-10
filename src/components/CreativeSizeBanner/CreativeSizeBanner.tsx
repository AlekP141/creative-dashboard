import { FormEvent, useState, useRef } from "react"
import "./CreativeSizeBanner.css"

const CreativeSizeBanner = () => {

  const [creativeSizes, setCreativeSizes] = useState(["100x300", "450x450"])
  const creativeSizeHeightRef = useRef<HTMLInputElement>(null)
  const creativeSizeWidthRef = useRef<HTMLInputElement>(null)

  const addNewCreativeHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newHeight = creativeSizeHeightRef.current?.value;
    const newWidth = creativeSizeWidthRef.current?.value;

    if (newHeight && newWidth) {
      const newSize = `${newHeight}x${newWidth}`;
      setCreativeSizes([...creativeSizes, newSize]);

      // Clear input fields after adding new creative size
      creativeSizeHeightRef.current.value = "";
      creativeSizeWidthRef.current.value = "";
    }
  };

  return (
    <div className="creativeSizeContainer">
      <ul className="creativeSizeList">
        {creativeSizes.map((size) => {
          return <li key={size} className="creativeSize">{size}</li>
        })}
        <li className="addNewCreativeSize" onClick={() => {
          const addSizeForm = document.querySelector(".addSizeForm") as HTMLElement
          addSizeForm ? addSizeForm.style.display = "block" : null
        }}>+</li>
        <form className="addSizeForm" onSubmit={addNewCreativeHandler}>
          <input ref={creativeSizeHeightRef} type="text" placeholder="Height"></input>
          <input ref={creativeSizeWidthRef} type="text" placeholder="Width"></input>
          <button type="submit">Add</button>
        </form>
      </ul>
    </div>
  )
}

export default CreativeSizeBanner
