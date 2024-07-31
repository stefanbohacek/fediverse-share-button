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
