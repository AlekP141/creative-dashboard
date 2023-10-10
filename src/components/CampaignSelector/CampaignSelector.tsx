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
  return (
    <>
      <h2>{selectedCampaign}</h2>
      <form action="">
        <input list="campaigns" name="campaign" />
        <datalist id="campaigns">
          {campaigns.map((name) => {
            return <option key={name} value={name}></option>;
          })}
        </datalist>
      </form>
    </>
  );
};

export default CampaignSelector;
