import "./CreativeOptions.scss";
import { useEffect, useState, useLayoutEffect, useRef } from "react";

const CreativeOptions = () => {
  const [creativeHeight, setCreativeHeight] = useState<number>(0);
  const [creativeWidth, setCreativeWidth] = useState<number>(0);
  const iframe = document.getElementById("iframe") as HTMLIFrameElement;
  const creativeRef = useRef<Document | null>(null);
  if (iframe && iframe.contentDocument) {
    creativeRef.current = iframe.contentDocument;
  }



  useLayoutEffect(() => {
    const creative = creativeRef.current;
    if (creative) {
      const body = creative.querySelector("body") as HTMLBodyElement;
      const newHeight = body.offsetHeight - 2;
      const newWidth = body.offsetWidth - 2;
      setCreativeHeight(newHeight);
      setCreativeWidth(newWidth);
    }
  }, []);

  useEffect(() => {
    console.log(creativeHeight);
    console.log(creativeWidth);
  }, [creativeHeight, creativeWidth]);

  return (
    <div className="optionsContainer">
      <h2 className="optionsTitle">Options</h2>
    </div>
  );
};

export default CreativeOptions;
