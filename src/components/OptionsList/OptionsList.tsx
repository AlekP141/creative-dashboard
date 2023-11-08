import BackgroundUpload from "../BackgroundUpload/BackgroundUpload.";
import TextEdit from "../TextEdit/TextEdit";
import "./OptionsList.scss"
import LogoEdit from "../LogoEdit/LogoEdit";

interface IOptionsList {
  classes: string;
  creativeHeight: number;
  creativeWidth: number;
}

const OptionsList = ({ classes, creativeHeight, creativeWidth }: IOptionsList) => {

  return classes.includes("container") ? null : (
    <div className="typeOptions" key={classes[0]}>
      <h5 className="classSectionTitle">
        {classes[0]
          .split(/(?=[A-Z])/)
          .join(" ")
          .toLocaleUpperCase()}
      </h5>
      {classes.includes("text") ? (
        // Pass in classes to make sure that the correct class is being called since multiple text classes will exist
        <TextEdit classes={classes} width={creativeWidth} height={creativeHeight} />
      ) : classes.includes("image") ? (
        <BackgroundUpload />
      ) : classes.includes("logo") ? (
        <LogoEdit classes={classes} width={creativeWidth} height={creativeHeight} />
      ) : null}
    </div>
  );
};

export default OptionsList
