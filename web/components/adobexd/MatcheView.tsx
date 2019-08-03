import React, { FunctionComponent, useState, useEffect } from "react";
import { interpolate, animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";
import { MeUser } from "../../generated/apolloComponents";

interface Props {
  user: MeUser;
}

const imageNull = "/static/ImageNull.png";

export const MatcheView: FunctionComponent<Props> = props => {
  const [windowWidthBound, setWindoWidthBound] = useState(0);
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));

  useEffect(() => {
    setWindoWidthBound(window.innerWidth / 10);
  }, []);

  // 1. we define the drag gesture logic using the useDrag hook
  const bind = useDrag(({ down, delta }) => {
    set({ x: down ? delta[0] : 0, y: down ? delta[1] : 0 });
  });
  const translate = (x: number, y: number) =>
    `translate3d(${x}px, ${y}px, 0) rotate(${x / 10}deg)`;

  return (
    <Container
      {...bind()}
      style={{
        transform: interpolate([x, y], translate as any)
      }}
    >
      <animated.div
        style={{
          backgroundImage: `url(${
            props.user.pictureUrl ? props.user.pictureUrl : imageNull
          })`
        }}
      />
    </Container>
  );
};

const Container = styled(animated.div)`
  background-color: transparent;
  width: 15vw;
  height: 30vh;
  div {
    position: absolute;
    background-size: 100% cover;
    background-repeat: no-repeat;
    background-position: center;

    width: 100%;
    height: 100%;
    will-change: transform;
  }
`;
