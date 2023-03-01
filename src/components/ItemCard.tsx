import { Card } from "antd";
import styled from "styled-components";
import ItemCardContent from "./ItemCardContent";

const ItemCard = styled(Card)`
  .ant-card-body {
    padding-right: 0;
    padding-left: 0;
    padding-bottom: 0;
  }

  &:hover ${ItemCardContent} {
    background-color: #f5f5f5;
  }
`;

export default ItemCard;
