export const setFlashMessage = (message, key) => {
  localStorage.setItem(key, message);
};

export const getFlashMessage = key => {
  if (localStorage.getItem(key)) {
    const message = localStorage.getItem(key);
    localStorage.removeItem(key);
    return message;
  }
};

export const hasFlashMessage = key => {
  if (localStorage.getItem(key)) {
    return true;
  }
  return false;
};
