import { FormEvent, useRef } from "react";

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
    }
  };

  return (
    <>
      <h2 className="campaignTitle">{selectedCampaign}</h2>
      <p className="changeSelection">Change Selection</p>
      <form className="campaignForm" onSubmit={changeCampaignHandler}>
        <input ref={campaignRef} list="campaigns" name="campaign" />
        <datalist id="campaigns">
          {campaigns.map((name) => {
            return <option key={name} value={name}></option>;
          })}
        </datalist>
        <button type="submit">Select</button>
      </form>
    </>
  );
};

export default CampaignSelector;
