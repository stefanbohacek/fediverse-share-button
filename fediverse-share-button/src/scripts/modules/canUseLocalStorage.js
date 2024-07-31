const canUseLocalStorage =
  localStorage.getItem("fsb-consent-given") !== "false" ? true : false;
