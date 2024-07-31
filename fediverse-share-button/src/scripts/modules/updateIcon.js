let typingTimer;
const doneTypingInterval = 1300;

const updateIcon = async (domainInput) => {
  clearTimeout(typingTimer);
  if (domainInput.value) {
    typingTimer = setTimeout(() => {
      doneTyping(domainInput);
    }, doneTypingInterval);
  } else {
    const iconEl =
      domainInput.parentElement.getElementsByClassName("fsb-icon")[0];
    updateTheIcon(iconEl, "mastodon");
  }
};
