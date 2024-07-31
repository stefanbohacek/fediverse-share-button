const getFSBPath = () => {
  var scripts = document.getElementsByClassName("fsb-script")[0];
  src = scripts.src;
  return src.replace("/script.min.js", "");
};
