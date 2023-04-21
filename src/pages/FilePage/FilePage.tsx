import { ArrowLeftOutlined, DownloadOutlined } from "@ant-design/icons";
import PdfViewer from "@components/PDFViewer";
import { useGetFileByIdWithAccessQuery } from "@generated/schemas";
import useRouter from "@hooks/useRouter";
import { downloadURI, getFileURL, hasVideoExtension } from "@utils/tools";
import { Modal, Typography, Image } from "antd";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";
import ReactPlayer from "react-player";

export const FilePage = () => {
  const [isShowAccessDeniedModal, setIsShowAccessDeniedModal] = useState(false);
  const { params, navigate, goBack } = useRouter();

  const { data } = useGetFileByIdWithAccessQuery({
    variables: {
      fileID: params.fileID || "",
    },
    skip: !params.fileID,
    onError: () => {
      setIsShowAccessDeniedModal(true);
    },
    fetchPolicy: "cache-and-network",
  });

  const onOkAccessDeniedModal = () => {
    setIsShowAccessDeniedModal(false);
    navigate("/");
  };

  const renderPreview = () => {
    const file = data?.getFileByIDWithAccess;
    const url = getFileURL(data?.getFileByIDWithAccess?.ID);
    if (
      file?.fileType === "png" ||
      file?.fileType === "jpg" ||
      file?.fileType === "svg"
    ) {
      return (
        <Image
          src={url}
          preview={false}
          className={`object-contain origin-top-left transition-transform duration-300 ease-out min-w-[300px]`}
        />
      );
    }
    if (file?.fileType === "pdf") {
      return <PdfViewer url={url} />;
    }

    if (hasVideoExtension(String(file?.fileType)))
      return <ReactPlayer url={url} controls height="800px" width="1422px" />;

    return null;
  };

  const handleDownload = () => {
    downloadURI(
      String(data?.getFileByIDWithAccess.ID),
      "files",
      data?.getFileByIDWithAccess.name || ""
    );
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex flex-col items-center justify-start z-50 h-full">
        <Header className="w-full flex items-center justify-between bg-header-black mb-8">
          <div className="flex gap-2 items-center">
            <ArrowLeftOutlined
              onClick={goBack}
              className="text-white text-xl hover:bg-[rgba(145,144,144,0.87)] rounded-2xl p-2"
            />
            <span className="text-white text-sm">
              {data?.getFileByIDWithAccess?.name}
            </span>
          </div>
          <div>
            <DownloadOutlined
              onClick={handleDownload}
              className="text-white text-xl hover:bg-[rgba(145,144,144,0.87)]  rounded-2xl p-2"
            />
          </div>
        </Header>
        <div className="flex items-center justify-center h-full min-w-[500px]">
          {renderPreview()}
        </div>
      </div>
      {isShowAccessDeniedModal && (
        <Modal
          title="Access Denied"
          open={isShowAccessDeniedModal}
          onOk={onOkAccessDeniedModal}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <Typography.Text>{`You don't have access to this file`}</Typography.Text>
        </Modal>
      )}
    </>
  );
};
