import {
  FilePdfOutlined,
  FileZipOutlined,
  FileTextOutlined,
  FileOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import { File as FileSchema } from "@generated/schemas";
import { Image } from "antd";

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

export const downloadURI = (
  fileID: string,
  type: "files" | "folders",
  name: string
) => {
  const storage = useLocalStorage();
  const link = document.createElement("a");
  document.body.appendChild(link);
  const headers = new Headers();
  const token = storage.getLocalStorage("token");
  headers.append("Authorization", `Bearer ${token}`);

  fetch(`${import.meta.env.VITE_BASE_API}/${type}/${fileID}`, { headers })
    .then((response) => response.blob())
    .then((blobby) => {
      const objectUrl = window.URL.createObjectURL(blobby);

      link.href = objectUrl;
      link.download = name;
      link.click();

      window.URL.revokeObjectURL(objectUrl);
    });
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

export const getFileURL = (fileID?: string) =>
  `${import.meta.env.VITE_BASE_API}/files/${fileID}`;

export const renderIconByFileType = (file: FileSchema) => {
  switch (file.fileType) {
    case "pdf":
      return <FilePdfOutlined className="text-7xl mt-6" />;
    case "png":
    case "jpg":
      // eslint-disable-next-line no-case-declarations
      const url = getFileURL(file.ID);
      return (
        <Image
          src={url}
          preview={false}
          height={104}
          className="object-cover"
        />
      );
    case "mp4":
    case "mp3":
      return <AudioOutlined className="text-7xl mt-6" />;
    case "zip":
      return <FileZipOutlined className="text-7xl mt-6" />;
    case "txt":
      return <FileTextOutlined className="text-7xl mt-6" />;
    default:
      return <FileOutlined className="text-7xl mt-6" />;
  }
};

export const getGeneratedAvatar = (seed: string) =>
  `https://api.dicebear.com/6.x/fun-emoji/svg?radius=50&seed=${seed}`;

export const getBase64StringOfImage = (base64: string) =>
  `data:image/png;base64,${base64}`;
