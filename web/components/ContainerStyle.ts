import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin: 0;

  background-color: #f1f9ff;
  justify-content: space-between;
`;

export const CenterButton = styled.div`
  position: fixed;
  margin: 0;
  bottom: 2rem;
  text-align: center;
  width: 33vw;
  button {
    margin-left: 2.5rem;
    margin-right: 2.5rem;
  }
`;
