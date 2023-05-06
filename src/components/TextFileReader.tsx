import React, { useState, useEffect } from "react";
interface Props {
  url: string;
}

const TextFileReader = ({ url }: Props) => {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then((data) => setText(data))
      .catch((error) => console.error(error));
  }, [url]);

  return (
    <div className="bg-white overflow-auto w-[100rem] top-20 absolute bottom-16 p-4">
      <pre className="whitespace-wrap">{text}</pre>
    </div>
  );
};

export default TextFileReader;
