const readFromCache = (url: string): Object[] | null => {
  const data = sessionStorage.getItem(url);
  const parsedData = data ? JSON.parse(data) : null;
  return parsedData
    ? Array.isArray(parsedData)
      ? parsedData
      : [parsedData]
    : null;
};

const writeToCache = (url: string, data: Object): Boolean => {
  try {
    sessionStorage.clear();
    sessionStorage.setItem(url, JSON.stringify(data));
    return true;
  } catch (_) {
    return false;
  }
};

export { writeToCache, readFromCache };
