import { FormEvent, useRef } from "react";
import "./CampaignSelector.scss";

interface ICampaignSelector {
  campaigns: string[];
  selectedCampaign: string;
  onSelectedCampaign: (campaign: string) => void;
}
const CampaignSelector = ({
  campaigns,
  selectedCampaign,
  onSelectedCampaign,
}: ICampaignSelector) => {
  const campaignRef = useRef<HTMLInputElement>(null);
  const changeCampaignHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedValue = campaignRef.current?.value;
    if (selectedValue) {
      onSelectedCampaign(selectedValue);
      campaignRef.current.value = ""
    }
  };

  return (
    <div className="campaignContainer">
      <h1 className="campaignTitle">{selectedCampaign}</h1>
      <button
        className="changeSelection"
        onClick={(e) => {
          const target = e.target as HTMLButtonElement;
          target.style.display = "none";
          const form = document.querySelector(
            ".campaignFormContainer"
          ) as HTMLDivElement;
          if (form) {
            form.style.display = "flex";
          }
        }}
      >
        Change Selection
      </button>
      <div className="campaignFormContainer">
        <form className="campaignForm" onSubmit={changeCampaignHandler}>
          <input ref={campaignRef} list="campaigns" name="campaign" />
          <datalist id="campaigns">
            {campaigns.map((name) => {
              return <option key={name} value={name}></option>;
            })}
          </datalist>
          <button type="submit">Select</button>
        </form>
        <button className="formClose" onClick={() => {
          const formContainer = document.querySelector(".campaignFormContainer") as HTMLFormElement;
          if (formContainer) {
            formContainer.style.display = "none"
          }
          const changeSelection = document.querySelector(".changeSelection") as HTMLButtonElement;
          if (changeSelection) {
            changeSelection.style.display = "inline-block"
          }
        }}>
          x
        </button>
      </div>
    </div>
  );
};

export default CampaignSelector;
