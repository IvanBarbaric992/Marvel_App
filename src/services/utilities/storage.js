export const getItemFromStorage = ({ key }) => {
  try {
    const stringifiedState = localStorage.getItem(key);
    if (stringifiedState === null) {
      return undefined;
    }
    return JSON.parse(stringifiedState);
  } catch (error) {
    return undefined;
  }
};

export const setItemToStorage = ({ key, value }) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return undefined;
  }

  if (Object.keys(value).length === 0) {
    removeItemFromStorage({ key });
  }
};

export const removeItemFromStorage = ({ key }) => {
  return localStorage.removeItem(key);
};
