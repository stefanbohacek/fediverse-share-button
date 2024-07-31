const hidePlatformSupportVisibilityNote = (shareBtn) => {
  const supportNote =
    shareBtn.parentElement.parentElement.getElementsByClassName(
      "fsb-support-note"
    )[0];

  supportNote.classList.add("fsb-d-none");
};
