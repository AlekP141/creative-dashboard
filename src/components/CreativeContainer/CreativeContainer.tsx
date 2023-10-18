import "./CreativeContainer.scss";
import { ReactNode, useEffect, useState } from "react";

interface ICreativeContainer {
  children: ReactNode;
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
  children,
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

  return (
    <div className="creativeFrame">
      {children}
      <div className="creativeContainer">
        {isValidFile ? (
          <iframe
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
