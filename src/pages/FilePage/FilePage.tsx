import { DownloadOutlined, LeftOutlined } from '@ant-design/icons';
import PdfViewer from '@components/PDFViewer';
import { useGetFileByIdWithAccessQuery } from '@generated/schemas';
import useRouter from '@hooks/useRouter';
import { downloadURI, getFileURL, hasVideoExtension } from '@utils/tools';
import { Modal, Typography, Image, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import ReactPlayer from 'react-player';

export const FilePage = () => {
  const [isShowAccessDeniedModal, setIsShowAccessDeniedModal] = useState(false);
  const { params, navigate, goBack } = useRouter();

  const { data } = useGetFileByIdWithAccessQuery({
    variables: {
      fileID: params.fileID || '',
    },
    skip: !params.fileID,
    onError: () => {
      setIsShowAccessDeniedModal(true);
    },
    fetchPolicy: 'cache-and-network',
  });

  const onOkAccessDeniedModal = () => {
    setIsShowAccessDeniedModal(false);
    navigate('/');
  };

  const renderPreview = () => {
    const file = data?.getFileByIDWithAccess;
    const url = getFileURL(data?.getFileByIDWithAccess?.ID);
    if (file?.fileType === 'png' || file?.fileType === 'jpg') {
      return (
        <div className="w-[500px]">
          <Image src={url} preview={false} />
        </div>
      );
    }
    if (file?.fileType === 'pdf') {
      return <PdfViewer url={url} />;
    }

    if (hasVideoExtension(String(file?.fileType)))
      return <ReactPlayer url={url} controls height="800px" width="1422px" />;

    return null;
  };

  const handleDownload = () => {
    downloadURI(String(data?.getFileByIDWithAccess.ID), 'files', data?.getFileByIDWithAccess.name || '');
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex flex-col items-center justify-start z-50 h-full"
        // onClick={onClose}
      >
        <Header className="w-full flex items-center justify-between bg-header-black mb-8">
          <Button icon={<LeftOutlined />} shape="circle" onClick={goBack}></Button>
          <Typography.Title level={3} className="text-white">
            {data?.getFileByIDWithAccess?.name}
          </Typography.Title>
          <div>
            <Button type="default" shape="circle" icon={<DownloadOutlined />} size="large" onClick={handleDownload} />
          </div>
        </Header>
        {renderPreview()}
      </div>
      {isShowAccessDeniedModal && (
        <Modal
          title="Access Denied"
          open={isShowAccessDeniedModal}
          onOk={onOkAccessDeniedModal}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <Typography.Text>{`You don't have access to this file`}</Typography.Text>
        </Modal>
      )}
    </>
  );
};
