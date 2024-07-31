(async () => {
  const savedDomain = canUseLocalStorage
    ? localStorage.getItem("fsb-domain")
    : false;
  const savedSoftware = canUseLocalStorage
    ? localStorage.getItem("fsb-software")
    : false;

  if (savedSoftware) {
    window.fsbGlobalSoftware = savedSoftware;
  }

  [...document.getElementsByClassName("fsb-prompt")].forEach((fsbPrompt) => {
    const domainInput = fsbPrompt.getElementsByClassName("fsb-domain")[0];
    const shareBtn = fsbPrompt.getElementsByClassName("fsb-button")[0];

    if (savedDomain) {
      domainInput.value = savedDomain;

      if (savedSoftware) {
        domainInput.dataset.software = savedSoftware;
        shareBtn.disabled = true;

        const iconEl =
          domainInput.parentElement.getElementsByClassName("fsb-icon")[0];
        updateTheIcon(iconEl, savedSoftware);

        if (supportedSoftware.includes(savedSoftware)) {
          shareBtn.disabled = false;
        }
      } else {
        updateIcon(domainInput);
      }
    }

    domainInput.addEventListener("input", () => {
      shareBtn.disabled = true;
      const iconEl =
        domainInput.parentElement.getElementsByClassName("fsb-icon")[0];

      hidePlatformSupportVisibilityNote(shareBtn);
      updateTheIcon(iconEl, "question");

      if (domainInput.value) {
        shareBtn.innerHTML = shareBtn.innerHTML.replace("Share", "Loading");
      } else {
        updateTheIcon(iconEl, "question");
        shareBtn.innerHTML = shareBtn.innerHTML.replace("Loading", "Share");
      }
      updateIcon(domainInput);
    });

    domainInput.addEventListener("change", () => {
      // shareBtn.disabled = true;
      // hidePlatformSupportVisibilityNote(shareBtn);
    });

    fsbPrompt.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const domain = getDomain(domainInput?.value?.trim());

      if (domain?.length) {
        const shareText = getSelectedText() || getPageTitle();

        if (canUseLocalStorage) {
          localStorage.setItem("fsb-domain", domain);
          if (window.fsbGlobalSoftware) {
            localStorage.setItem("fsb-software", window.fsbGlobalSoftware);
          }
        }

        let shareURL = `https://${domain}/share?text=${
          // getPageTitle() + " " + getPageURL()
          shareText + "%0A%0A" + getPageURL()
        }`;

        if (domainInput?.dataset?.software) {
          if (
            ["diaspora", "friendica"].includes(domainInput.dataset.software)
          ) {
            shareURL = `https://${domain}/bookmarklet?url=${getPageURL()}&title=${shareText}&note=${getPageDescription()}`;
          } else if (domainInput.dataset.software === "hubzilla") {
            shareURL = `https://${domain}/rpost?url=${getPageURL()}&body=${shareText}[br][br]`;
          } else if (domainInput.dataset.software === "lemmy") {
            shareURL = `https://${domain}/create_post?title=${shareText}&url=${getPageURL()}&body=${getPageDescription()}`;
          } else if (domainInput.dataset.software === "threads") {
            shareURL = `https://${domain}/intent/post?text=${
              shareText + "%0A%0A" + getPageURL()
            }`;
          }
        }

        // window.open(shareURL);
        // Doesn't work on iOS https://stackoverflow.com/questions/20696041/window-openurl-blank-not-working-on-imac-safari
        window.location.assign(shareURL);
      }
    });
  });
})();
