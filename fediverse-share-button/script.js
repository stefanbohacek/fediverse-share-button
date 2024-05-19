(async () => {
  // List of suported fediverse software.

  const knownSoftware = [
    "calckey",
    "diaspora",
    "ecko",
    "firefish",
    "friendica",
    "glitch-soc",
    "gnu_social",
    "gotosocial",
    "groundpolis",
    "hometown",
    "hubzilla",
    "kepi",
    "lemmy",
    "mastodon",
    "misskey",
    "misty",
    "osada",
    "pleroma",
    "sharkey",
    "socialhome",
    "threads",
    "xmpp",
    "zap",
  ];

  const supportedSoftware = [
    "diaspora",
    "firefish",
    "friendica",
    "glitch-soc",
    "hometown",
    "lemmy",
    "mastodon",
    "misskey",
    "sharkey",
    "threads",
  ];

  // Helper functions.

  const getFSBPath = () => {
    var scripts = document.getElementsByClassName("fsb-script")[0];
    src = scripts.src;
    return src.replace("/script.min.js", "");
  };

  const updateTheIcon = (iconElement, software) => {
    const domainInput =
      iconElement.parentElement.parentElement.parentElement.getElementsByClassName(
        "fsb-domain"
      )[0];
    const supportNote =
      iconElement.parentElement.parentElement.parentElement.getElementsByClassName(
        "fsb-support-note"
      )[0];

    const supportNoteLink =
      iconElement.parentElement.parentElement.parentElement.getElementsByClassName(
        "fsb-support-note-link"
      )[0];

    iconElement.src = `${getFSBPath()}/icons/${software}.svg`;
    iconElement.alt = `${software} platform logo`;

    supportNote.classList.add("fsb-d-none");

    if (
      domainInput.value &&
      domainInput.value.trim().length > 0 &&
      !supportedSoftware.includes(software)
    ) {
      supportNoteLink.href = `https:\\${domainInput.value}`;
      supportNoteLink.innerHTML = domainInput.value;
      supportNote.classList.remove("fsb-d-none");
    }
  };

  const updateIcon = async (domainInput) => {
    clearTimeout(typingTimer);
    if (domainInput.value) {
      typingTimer = setTimeout(() => {
        doneTyping(domainInput);
      }, doneTypingInterval);
    } else {
      const iconEl =
        domainInput.parentElement.getElementsByClassName("fsb-icon")[0];
      updateTheIcon(iconEl, "question");
    }
  };

  const doneTyping = async (el) => {
    const shareBtn = el.parentElement.getElementsByClassName("fsb-button")[0];
    const domain = getDomain(el.value);

    shareBtn.disabled = true;
    const resp = await fetch(
      `https://fediverse-info.stefanbohacek.dev/node-info?domain=${domain}`
    );

    const respJSON = await resp.json();
    const software = respJSON?.software?.name;
    const iconEl = el.parentElement.getElementsByClassName("fsb-icon")[0];

    el.dataset.software = software;

    if (software) {
      localStorage.setItem("fsb-software", software);
    }

    if (software && knownSoftware.includes(software)) {
      updateTheIcon(iconEl, software);
    } else {
      updateTheIcon(iconEl, "question");
    }
    shareBtn.disabled = false;
  };

  const getPageTitle = () => {
    let pageTitle = document.title;

    try {
      pageTitle = document
        .querySelector("meta[property='og:title']")
        .getAttribute("content");
    } catch (error) {
      // noop
    }

    return encodeURIComponent(pageTitle);
  };

  const getPageDescription = () => {
    let pageDescription = "";

    const metaDescription =
      document.querySelector("meta[name='description']") ||
      document.querySelector("meta[property='og:description']") ||
      null;
    if (metaDescription && metaDescription.getAttribute) {
      pageDescription = metaDescription.getAttribute("content");
    }

    return encodeURIComponent(pageDescription);
  };

  const getPageURL = () => encodeURIComponent(window.location.href);
  const getDomain = (str) => str.replace(/(^\w+:|^)\/\//, "");
  const truncate = (input) =>
    input.length > 5 ? `${input.substring(0, 450)}...` : input;

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

  // Main script.

  let typingTimer;
  const doneTypingInterval = 1300;
  const savedDomain = localStorage.getItem("fsb-domain");
  const savedSoftware = localStorage.getItem("fsb-software");

  [...document.getElementsByClassName("fsb-prompt")].forEach((fsbPrompt) => {
    const domainInput = fsbPrompt.getElementsByClassName("fsb-domain")[0];
    const shareBtn = fsbPrompt.getElementsByClassName("fsb-button")[0];

    if (savedDomain) {
      domainInput.value = savedDomain;

      if (savedSoftware) {
        domainInput.dataset.software = savedSoftware;

        const iconEl =
          domainInput.parentElement.getElementsByClassName("fsb-icon")[0];
        updateTheIcon(iconEl, savedSoftware);
      } else {
        updateIcon(domainInput);
      }
    }

    domainInput.addEventListener("input", () => {
      updateIcon(domainInput);
    });

    domainInput.addEventListener("change", () => {
      shareBtn.disabled = true;
    });

    fsbPrompt.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const domain = getDomain(domainInput?.value?.trim());

      if (domain?.length) {
        const shareText = getSelectedText() || getPageTitle();

        localStorage.setItem("fsb-domain", domain);

        let shareURL = `https://${domain}/share?text=${
          // getPageTitle() + " " + getPageURL()
          shareText + "%0A%0A" + getPageURL()
        }`;

        if (domainInput?.dataset?.software) {
          if (
            ["diaspora", "friendica"].includes(domainInput.dataset.software)
          ) {
            shareURL = `https://${domain}/bookmarklet?url=${getPageURL()}&title=${shareText}&note=${getPageDescription()}`;
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
