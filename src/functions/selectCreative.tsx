const selectCreative = () => {

  const iframe = document.getElementById("iframe") as HTMLIFrameElement;
  let creative: Document | null = null;
  if (iframe && iframe.contentDocument) {
    creative = iframe.contentDocument;
  }

  return creative
}

export default selectCreative
