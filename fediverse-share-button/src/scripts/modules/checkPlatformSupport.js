const checkPlatformSupport = (shareBtn) => {
  const supportNote =
    shareBtn.parentElement.parentElement.getElementsByClassName(
      "fsb-support-note"
    )[0];

  const domainInput =
    shareBtn.parentElement.parentElement.getElementsByClassName(
      "fsb-domain"
    )[0];

  supportNote.classList.add("fsb-d-none");

  let note =
    shareBtn.parentElement.parentElement.getElementsByClassName(
      "fsb-note"
    )[0];

  if (!note) {
    note = document.createElement("p");
    note.classList.add("fsb-note");
    note.classList.add("fsb-d-none");
    supportNote.parentNode.insertBefore(note, supportNote.nextSibling);
  }

  const supportNoteLink =
    shareBtn.parentElement.parentElement.getElementsByClassName(
      "fsb-support-note-link"
    )[0];

  if (note) {
    note.classList.add("fsb-d-none");
  }

  if (!supportedSoftware.includes(window.fsbGlobalSoftware)) {
    supportNoteLink.href = `https://${domainInput.value}`;
    supportNoteLink.innerHTML = domainInput.value;
    supportNote.classList.remove("fsb-d-none");
  }

  if (note && notes[window.fsbGlobalSoftware]) {
    note.innerHTML = notes[window.fsbGlobalSoftware];
    note.classList.remove("fsb-d-none");
  }
};