import { useState } from "react";
import "./App.css";
import CreativeSizeBanner from "./components/CreativeSizeBanner/CreativeSizeBanner";
import CreativeContainer from "./components/CreativeContainer/CreativeContainer";
import CreativeOptions from "./components/CreativeOptions/CreativeOptions";

function App() {
  const [selectedSize, setSelectedSize] = useState("");
  return (
    <>
      <CreativeSizeBanner
        selectedSize={selectedSize}
        onSelectedSize={(size: string) => {
          setSelectedSize(size);
        }}
      />
      <div className="creativesEditor">
        <CreativeContainer />
        <CreativeOptions />
      </div>
    </>
  );
}

export default App;
