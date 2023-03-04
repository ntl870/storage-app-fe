import { Card } from "antd";
import styled from "styled-components";
import FileCardContent from "./FileCardContent";

const FileCard = styled(Card)`
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
