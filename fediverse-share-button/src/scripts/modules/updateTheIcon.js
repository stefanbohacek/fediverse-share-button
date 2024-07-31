const updateTheIcon = (iconElement, software) => {
  iconElement.src = `${getFSBPath()}/icons/${software}.svg`;
  iconElement.alt = `${software} platform logo`;
};
