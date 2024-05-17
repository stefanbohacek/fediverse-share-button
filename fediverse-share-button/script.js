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
    "socialhome",
    "xmpp",
    "zap",
  ];

  const supportedSoftware = [
    "diaspora",
    "glitch-soc",
    "firefish",
    "hometown",
    "lemmy",
    "mastodon",
    "misskey",
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
    if (supportedSoftware.includes(software)) {
      supportNote.classList.add("fsb-d-none");
    } else {
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
    const domain = getDomain(el.value);

    const resp = await fetch(
      `https://fediverse-info.stefanbohacek.dev/node-info?domain=${domain}`
    );

    const respJSON = await resp.json();
    const software = respJSON?.software?.name;
    const iconEl = el.parentElement.getElementsByClassName("fsb-icon")[0];

    el.dataset.software = software;

    if (software && knownSoftware.includes(software)) {
      updateTheIcon(iconEl, software);
    } else {
      updateTheIcon(iconEl, "question");
    }
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

  const getSelectedText = () => {
    // https://stackoverflow.com/a/5379408

    let text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    // return text.replace(/(\r\n|\n|\r)/gm, "");
    return text;
  };

  const getPageURL = () => encodeURIComponent(window.location.href);
  const getDomain = (str) => str.replace(/(^\w+:|^)\/\//, "");

  // Main script.

  let typingTimer;
  const doneTypingInterval = 1300;
  const savedDomain = localStorage.getItem("fsb-domain");

  [...document.getElementsByClassName("fsb-prompt")].forEach((fsbPrompt) => {
    const domainInput = fsbPrompt.getElementsByClassName("fsb-domain")[0];

    if (savedDomain) {
      domainInput.value = savedDomain;
      updateIcon(domainInput);
    }

    domainInput.addEventListener("input", () => {
      updateIcon(domainInput);
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
          if (domainInput.dataset.software === "diaspora") {
            shareURL = `https://${domain}/bookmarklet?url=${getPageURL()}&title=${shareText}&note=${getPageDescription()}`;
          }
        }

        window.open(shareURL);
      }
    });
  });
})();
