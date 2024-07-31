const getSelectedText = () => {
  // https://stackoverflow.com/a/5379408

  let text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  // return text.replace(/(\r\n|\n|\r)/gm, "");
  return truncate(text);
};
