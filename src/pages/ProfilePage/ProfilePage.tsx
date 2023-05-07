import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useUpdateUserMutation } from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import useCurrentUser from "@hooks/useCurrentUser";
import { getGeneratedAvatar, getBase64StringOfImage } from "@utils/tools";
import {
  Button,
  Form,
  Input,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { UploadChangeParam, RcFile } from "antd/es/upload";
import { useState } from "react";

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const ProfilePage = () => {
  const { avatar, ID, email, name, currentPackage } = useCurrentUser();
  const { showSuccessNotification, showErrorNotification } = useAlert();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    !avatar ? getGeneratedAvatar(String(ID)) : getBase64StringOfImage(avatar)
  );
  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation({
    refetchQueries: ["getMe"],
  });
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const onFinish = async (values: any) => {
    try {
      const image = imageUrl.split(",")[1] || "";

      await updateUser({
        variables: {
          input: {
            name: values.name || name,
            avatar: image,
          },
        },
      });
      showSuccessNotification("Update profile successfully!");
    } catch (err) {
      showErrorNotification((err as Error).message);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-2">Upload</div>
    </div>
  );

  return (
    <div className="h-full flex flex-col items-center mt-16">
      <Upload
        name="avatar"
        listType="picture-circle"
        className="block w-auto avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      {imageUrl && (
        <Button color="danger" onClick={() => setImageUrl("")}>
          Remove Uploaded
        </Button>
      )}
      <Form className="mt-4 w-1/4" layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email:">
          <Input
            placeholder="Email"
            value={email}
            className="w-full"
            disabled
          />
        </Form.Item>
        <Form.Item name="name" label="Name:">
          <Input placeholder="Name" className="w-full" defaultValue={name} />
        </Form.Item>

        <Form.Item label="Current Plan:" required>
          <Input
            placeholder="Current Plan"
            className="w-full"
            defaultValue={currentPackage?.name}
            disabled
          />
        </Form.Item>

        <Form.Item className="text-center">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={updateUserLoading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
