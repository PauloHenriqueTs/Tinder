import * as React from "react";
import { FindUserFinduser } from "../../generated/apolloComponents";
import { animated, interpolate } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import DeslikeButton from "../view/DeslikeButton";
import LikeButton from "../view/LikeButton";

interface MatcheViewProps {
  matche: FindUserFinduser | null;
  translate: (x: number, y: number) => string;
  x: number;
  y: number;
}

const imageNull = "/static/ImageNull.png";

export const MatcheView1: React.FunctionComponent<MatcheViewProps> = props => {
  const { matche, translate, x, y } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Container
        style={{
          transform: interpolate([x, y], translate as any),
          backgroundImage: `url(${imageNull})`
        }}
        size={"33vw"}
        key={matche!.id}
      >
        <animated.div className={"title1"}>{matche!.name}</animated.div>
      </Container>
      <Center1>
        <DeslikeButton />
        <LikeButton />
      </Center1>
    </div>
  );
};

const Container = styled(animated.div)`
  background-color: transparent;
  width: ${(props: { size: string }) => props.size};
  height: 75vh;

  border-radius: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 0.5rem;
  :active {
    cursor: grab;
  }
  .title1 {
    margin-left: 0.5rem;
    position: relative;
    top: 75%;
    left: 5%;
    color: white;
    font-size: 1.5rem;
    text-shadow: 2px 2px rgba(0, 0, 0, 0.4);
    white-space: pre-wrap;
  }
  will-change: transform;

  display: flex;
`;

const Center1 = styled.div`
  position: fixed;
  bottom: 2rem;
  text-align: center;
  button {
    margin-left: 5vw;
    margin-right: 5vw;
  }
`;
