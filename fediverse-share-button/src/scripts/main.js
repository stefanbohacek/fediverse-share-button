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

        const shareEndpoints = {
          calckey: "share?text={TEXT}",
          diaspora: "bookmarklet?title={TITLE}&notes={DESCRIPTION}&url={URL}",
          fedibird: "share?text={TEXT}",
          firefish: "share?text={TEXT}",
          foundkey: "share?text={TEXT}",
          friendica: "compose?title={TITLE}&body={DESCRIPTION}%0A{URL}",
          glitchcafe: "share?text={TEXT}",
          gnusocial: "notice/new?status_textarea={TEXT}",
          hometown: "share?text={TEXT}",
          hubzilla: "rpost?title={TITLE}&body={DESCRIPTION}%0A{URL}",
          kbin: "new/link?url={URL}",
          lemmy: "create_post?url={URL}&title={TITLE}&body={DESCRIPTION}",
          mastodon: "share?text={TEXT}",
          meisskey: "share?text={TEXT}",
          microdotblog: "post?text=[{TITLE}]({URL})%0A%0A{DESCRIPTION}",
          misskey: "share?text={TEXT}",
        };

        let shareURL = `https://${domain}/share?text=${
          shareText + "%0A%0A" + getPageURL()
        }`;

        if (domainInput?.dataset?.software) {
          const software = domainInput.dataset.software;
          const pattern = shareEndpoints[software];

          if (pattern) {
            shareURL = `https://${domain}/${pattern}`
              .replace("{TEXT}", shareText)
              .replace("{TITLE}", shareText)
              .replace("{DESCRIPTION}", getPageDescription())
              .replace("{URL}", getPageURL());
          }
        }

        // window.open(shareURL);
        // Doesn't work on iOS https://stackoverflow.com/questions/20696041/window-openurl-blank-not-working-on-imac-safari
        window.location.assign(shareURL);
      }
    });
  });
})();
