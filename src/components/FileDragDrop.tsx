interface Props {
  children: React.ReactNode;
  handleDropFile(e: React.DragEvent<HTMLDivElement>): void;
  className?: string;
}

function FileDragDrop({ children, handleDropFile, className }: Props) {
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleDropFile(e);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={className}
    >
      {children}
    </div>
  );
}

export default FileDragDrop;
