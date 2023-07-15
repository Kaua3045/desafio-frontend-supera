import { styled } from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2em;
  margin: 2em 0em;
  align-items: center;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 20px;
`;

const ExtendTable = styled.div`
  gap: 2em;
  border: 1px solid;
`;
const MoneyInfo = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid;
`;

export {
  FlexContainer,
  Buttons,
  ExtendTable,
  MoneyInfo
};