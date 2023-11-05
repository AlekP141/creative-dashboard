import selectCreative from "../../functions/selectCreative";

interface ITextEdit {
  classes: string;
}

const TextEdit = ({ classes }: ITextEdit) => {
  const creative = selectCreative();
  const targetClass = classes[0];
  console.log(targetClass);
  return <div className="textEdit"></div>;
};

export default TextEdit;
