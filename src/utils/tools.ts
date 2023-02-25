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
