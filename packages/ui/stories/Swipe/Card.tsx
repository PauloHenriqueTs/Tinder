import * as React from "react";
import styled from "styled-components";

const Card: React.FC<any> = ({ zIndex = 0, children }) => (
  <Container style={{ zIndex }}>{children}</Container>
);

export default Card;

const Container = styled.div`
  background: whitesmoke;
  borderradius: 3;
  width: 250px;
  height: 250px;
  cursor: pointer;
  userselect: none;
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
