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
        <div className="optionParams">
          <p>Has Text</p>
          <p>Creative bounds: {height} x {width}</p>
        </div>
      ) : classes.includes("image") ? (
        <p>Has Image</p>
      ) : classes.includes("logo") ? (
        <p>Has Logo</p>
      ) : null}
    </div>
  );
};

export default OptionsList
