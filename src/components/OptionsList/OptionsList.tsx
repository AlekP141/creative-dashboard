import BackgroundUpload from "../BackgroundUpload/BackgroundUpload.";

interface IOptionsList {
  classes: string;
  creativeHeight: number;
  creativeWidth: number;
}

const OptionsList = ({ classes, creativeHeight, creativeWidth }: IOptionsList) => {

  const height = creativeHeight
  const width = creativeWidth
  return classes.includes("container") ? null : (
    <div className="typeOptions" key={classes[0]}>
      <h5>
        {classes[0]
          .split(/(?=[A-Z])/)
          .join(" ")
          .toLocaleUpperCase()}
      </h5>
      {classes.includes("text") ? (
        // Pass in classes to make sure that the correct class is being called since multiple text classes will exist
        <div className="optionParams">
          <p>Has Text</p>
          <p>Creative bounds: {height} x {width}</p>
        </div>
      ) : classes.includes("image") ? (
        <BackgroundUpload />
      ) : classes.includes("logo") ? (
        <p>Has Logo</p>
      ) : null}
    </div>
  );
};

export default OptionsList
