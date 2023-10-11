import "./CreativeContainer.scss";
import { ReactNode, useEffect, useState } from "react";

interface ICreativeContainer {
  children: ReactNode;
  selectedCampaign: string;
  selectedSize: string;
}

const fileValidation = async (size: string, campaign: string): Promise<boolean> => {
  try {
    const response = await fetch(`/campaigns/${campaign}/${size}-${campaign}.html`);
    return response.status === 200;
  } catch (error) {
    console.error('Error fetching file:', error);
    return false;
  }
};

const CreativeContainer = ({ children, selectedCampaign, selectedSize }: ICreativeContainer) => {
  const [isValidFile, setIsValidFile] = useState<boolean>(false);

  useEffect(() => {
    const validateFile = async () => {
      const isValid = await fileValidation(selectedSize, selectedCampaign);
      setIsValidFile(isValid);
    };

    validateFile();
  }, [selectedCampaign, selectedSize]);

  return (
    <div className="containerone">
      {children}
      {isValidFile ? (
        <iframe src={`/campaigns/${selectedCampaign}/${selectedSize}-${selectedCampaign}.html`} />
      ) : (
        <h1>Sorry, this file cannot be found.</h1>
      )}
    </div>
  );
};

export default CreativeContainer;
