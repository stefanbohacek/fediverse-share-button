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