import { Card } from "antd";
import styled from "styled-components";
import FileCardContent from "./FileCardContent";

const FileCard = styled(Card)`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  .ant-card-body {
    padding-right: 0;
    padding-left: 0;
    padding-bottom: 0;
  }

  &:hover ${FileCardContent} {
    background-color: #f5f5f5;
  }
`;

export default FileCard;
