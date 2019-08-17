import React from "react";
import styled from "styled-components";

export default function LikeButton(props: any) {
  return (
    <BtnLike size={"5rem"} onClick={props.onClick}>
      <svg viewBox="0 0 45.811 44.306">
        <path
          id="ic_favorite_24px"
          d="M24.905,47.306l-3.321-3.187C9.788,32.843,2,25.406,2,16.28,2,8.843,7.543,3,14.6,3A13.441,13.441,0,0,1,24.905,8.046,13.441,13.441,0,0,1,35.213,3c7.055,0,12.6,5.843,12.6,13.28,0,9.127-7.788,16.563-19.584,27.863Z"
          transform="translate(-2 -3)"
          fill="#00ff6c"
        />
      </svg>
    </BtnLike>
  );
}

interface ButtonProps {
  size: string;
}

const BtnLike = styled.button`
  width: ${(props: ButtonProps) => props.size || "1rem"};
  height: ${(props: ButtonProps) => props.size || "1rem"};
  border-radius: 50%;
  border: 0.01rem solid #f1f9ff;
  background-color: #fff;
  outline: none;
  padding: 0;
  margin: 0;
  svg {
    width: 75%;
    height: 75%;
  }

  &:hover {
    transform: scale(1.1);
  }
`;
