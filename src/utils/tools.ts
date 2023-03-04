export const useLocalStorage = () => {
  return {
    setLocalStorage: (key: string, value: any) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getLocalStorage: (key: string) => {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      return null;
    },
    deleteLocalStorage: (key: string) => {
      localStorage.removeItem(key);
    },
  };
};

export const downloadURI = (fileID: string, type: "files" | "folders") => {
  const link = document.createElement("a");
  link.href = `${import.meta.env.VITE_BASE_API}/${type}/${fileID}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
