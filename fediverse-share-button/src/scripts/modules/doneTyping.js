const doneTyping = async (el) => {
  const shareBtn = el.parentElement.getElementsByClassName("fsb-button")[0];
  const domain = getDomain(el.value);

  const resp = await fetch(
    `https://fediverse-info.stefanbohacek.dev/node-info?domain=${domain}&onlysoftware=true`
  );

  shareBtn.innerHTML = shareBtn.innerHTML.replace("Loading", "Share");

  const respJSON = await resp.json();
  const software = respJSON?.software?.name;
  const iconEl = el.parentElement.getElementsByClassName("fsb-icon")[0];

  el.dataset.software = software;
  window.fsbGlobalSoftware = software;

  checkPlatformSupport(shareBtn);

  if (software && knownSoftware.includes(software)) {
    updateTheIcon(iconEl, software);

    if (supportedSoftware.includes(software)) {
      shareBtn.disabled = false;
    }
  } else {
    updateTheIcon(iconEl, "question");
  }
};
