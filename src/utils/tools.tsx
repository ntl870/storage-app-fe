import {
  FilePdfOutlined,
  FileZipOutlined,
  FileTextOutlined,
  FileOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import { File as FileSchema, Folder } from "@generated/schemas";
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
    case "svg":
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

export const hasVideoExtension = (fileExtension: string) => {
  const videoExtensions = [
    "mp4",
    "webm",
    "ogg",
    "mov",
    "avi",
    "wmv",
    "flv",
    "3gp",
    "mkv",
    "m4v",
    "mpg",
    "mpeg",
    "m2v",
    "m4v",
    "svi",
    "3g2",
    "f4v",
    "f4p",
    "f4a",
    "f4b",
  ];
  return videoExtensions.includes(String(fileExtension));
};

export const getGeneratedAvatar = (seed: string) =>
  `https://api.dicebear.com/6.x/fun-emoji/svg?radius=50&seed=${seed}`;

export const getBase64StringOfImage = (base64: string) =>
  `data:image/png;base64,${base64}`;

export const covertBytesToGiB = (bytes: number) => {
  return bytes / (1024 * 1024 * 1024);
};

export const convertGibToBytes = (gib: number) => {
  return gib * 1024 * 1024 * 1024;
};

export const getTotalSizeOfFolder = (files: FileList | null) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Object.keys(files).reduce((acc, file) => {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Number(files[acc]?.size || 0) + Number(files[file as keyof FileList].size)
    );
  });
};

export const isEnoughSpaceLeft = (
  maxStorage: number,
  usedStorage: number,
  size: number
) => {
  return usedStorage + size < maxStorage;
};

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return bytes + " B";
  }
  if (bytes < 1048576) {
    return (bytes / 1024).toFixed(1) + " KB";
  }
  if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(1) + " MB";
  }

  return (bytes / 1073741824).toFixed(1) + " GB";
};

export const isAudioExtension = (extension: string): boolean => {
  const audioExtensions: string[] = ["mp3", "wav", "ogg", "flac", "aac"];
  return audioExtensions.includes(extension.toLowerCase());
};

export const getFolderEntries = async (folder: any) => {
  const entries = await folder.createReader?.().readEntries?.();
  return entries;
};

export const getFile = async (fileEntry: any) => {
  const file = await fileEntry.getFile();
  return file;
};
