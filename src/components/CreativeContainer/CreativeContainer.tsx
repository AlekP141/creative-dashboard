import "./CreativeContainer.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import CreativeOptions from "../CreativeOptions/CreativeOptions";
import selectCreative from "../../functions/selectCreative";

interface ICreativeContainer {
  selectedCampaign: string;
  selectedSize: string;
}

const fileValidation = async (
  size: string,
  campaign: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `/campaigns/${campaign}/${size}-${campaign}.html`
    );
    return response.status === 200;
  } catch (error) {
    console.error("Error fetching file:", error);
    return false;
  }
};

const CreativeContainer = ({
  selectedCampaign,
  selectedSize,
}: ICreativeContainer) => {
  const [isValidFile, setIsValidFile] = useState(false);

  useEffect(() => {
    const validateFile = async () => {
      if (selectedSize) {
        const isValid = await fileValidation(selectedSize, selectedCampaign);
        setIsValidFile(isValid);
      }
    };

    validateFile();
  }, [selectedCampaign, selectedSize]);

  const [docScale, setDocScale] = useState(1)

  const selectIframeDoc = () => {
    const creative = selectCreative()
    const body = creative?.querySelector("body") as HTMLBodyElement;
    return body
  }

  const zoomOut = () => {
    if (docScale >=0.4) {
      setDocScale(docScale - 0.2)
      const body = selectIframeDoc()
      body.style.scale = String(docScale)
    }
  };

  const zoomIn = () => {
    setDocScale(docScale + 0.2)
    const body = selectIframeDoc()
    body.style.scale = String(docScale)
  };

  const [creative, setCreative] = useState<Document>()

  return (
    <div className="creativeFrame">
      <div className="zoomFunction">
        <button onClick={zoomOut} className="zoomButton">
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <button onClick={zoomIn} className="zoomButton">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <CreativeOptions
        selectedSize={selectedSize}
        creative={creative}
      />
      <div className="creativeContainer">
        {isValidFile ? (
          <iframe
            onLoad={(e) => {
              const iframe = e.target as HTMLIFrameElement
              setCreative(iframe.contentDocument)
            }}
            id="iframe"
            src={`/campaigns/${selectedCampaign}/${selectedSize}-${selectedCampaign}.html`}
          />
        ) : (
          <h2>Error: No file found in this size.</h2>
        )}
      </div>
    </div>
  );
};

export default CreativeContainer;
