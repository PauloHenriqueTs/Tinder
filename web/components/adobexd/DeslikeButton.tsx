import React from "react";
import styled from "styled-components";

export default function DeslikeButton() {
  return (
    <BtnDeslike size={"5rem"}>
      <svg viewBox="0 0 50.469 59.929">
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="0.5"
            x2="0.5"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#f75006" />
            <stop offset="0.744" stop-color="#f50659" />
            <stop offset="1" stop-color="#f70559" />
          </linearGradient>
        </defs>
        <path
          id="ic_clear_24px"
          d="M55.469,11.036,50.386,5,30.234,28.929,10.083,5,5,11.036,25.151,34.964,5,58.893l5.083,6.036L30.234,41,50.386,64.929l5.083-6.036L35.317,34.964Z"
          transform="translate(-5 -5)"
          fill="url(#linear-gradient)"
        />
      </svg>
    </BtnDeslike>
  );
}

interface ButtonProps {
  size: string;
}

const BtnDeslike = styled.button`
  width: ${(props: ButtonProps) => props.size || "1rem"};
  height: ${(props: ButtonProps) => props.size || "1rem"};
  border-radius: 50%;
  border: 0.01rem solid #f1f9ff;
  background: none;
  outline: none;
  padding: 0;
  margin: 0;
  svg {
    width: 80%;
    height: 80%;
  }
  &:hover {
    transform: scale(1.1);
  }
`;
