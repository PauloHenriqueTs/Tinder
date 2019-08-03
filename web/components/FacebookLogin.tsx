import * as React from "react";
import styled from "styled-components";

const BtnFacebook = styled.button`
  width: 10rem;
  height: 2.1rem;
  border-radius: 4px;
  background: #3b5998;
  color: white;
  border: 0px transparent;
  text-align: center;
  margin: 5px;
  display: inline-block;

  &:hover {
    background: #3b5998;
    opacity: 0.6;
  }
`;

export function FacebookLogin() {
  return <BtnFacebook>&nbsp;&nbsp;Sign In with Facebook</BtnFacebook>;
}
