export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + '...';
  }
};

export const isValidURL = (url) => {
  let img = new Image();
  img.src = url;
  return img.complete && img.naturalWidth !== 0;
};
