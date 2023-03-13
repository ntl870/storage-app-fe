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

export const groupFilesByFolder = (files: File[]) => {
  const folders = [];

  for (const file of files) {
    const path = file.webkitRelativePath.split("/");
    const folderName = path[0];

    // Check if folder already exists in folders array
    let folder: any = folders.find((f) => f.name === folderName);

    // If folder doesn't exist, create it and add to folders array
    if (!folder) {
      folder = {
        name: folderName,
        files: [],
        folders: [],
      };
      folders.push(folder);
    }

    // Traverse subfolders and create them if they don't exist
    let currentFolder = folder;
    for (let i = 1; i < path.length - 1; i++) {
      const subfolderName = path[i];
      let subfolder = currentFolder.folders.find(
        (f: File) => f.name === subfolderName
      );
      if (!subfolder) {
        subfolder = {
          name: subfolderName,
          files: [],
          folders: [],
        };
        currentFolder.folders.push(subfolder);
      }
      currentFolder = subfolder;
    }

    // Add file to current folder
    currentFolder.files.push(file);
  }

  return folders;
};
