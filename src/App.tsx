import { useState } from "react";
import "./App.scss";
import CreativeSizeBanner from "./components/CreativeSizeBanner/CreativeSizeBanner";
import CreativeContainer from "./components/CreativeContainer/CreativeContainer";
import CampaignSelector from "./components/CampaignSelector/CampaignSelector";

function App() {
  const [selectedSize, setSelectedSize] = useState("");
  const campaigns = ["porsche-traffic", "audi"];
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);

  return (
    <div className="layoutDiv">
      <CampaignSelector
        campaigns={campaigns}
        selectedCampaign={selectedCampaign}
        onSelectedCampaign={(campaign: string) => {
          setSelectedCampaign(campaign);
        }}
      />
      <CreativeSizeBanner
        selectedSize={selectedSize}
        onSelectedSize={(size: string) => {
          setSelectedSize(size);
        }}
      />
      <CreativeContainer
        selectedCampaign={selectedCampaign}
        selectedSize={selectedSize}
      ></CreativeContainer>
    </div>
  );
}

export default App;
