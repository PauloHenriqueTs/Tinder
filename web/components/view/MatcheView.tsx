import React, { FunctionComponent, useState, useEffect } from "react";
import { interpolate, animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";
import {
  LikeMutation,
  LikeVariables,
  FindUserFinduser,
  Maybe
} from "../../generated/apolloComponents";
import { MutationFn } from "react-apollo";

interface Props {
  user: Maybe<FindUserFinduser>;
  size: string;
  likeFunction: MutationFn<LikeMutation, LikeVariables>;
}

const imageNull = "/static/ImageNull.png";

export const MatcheView: FunctionComponent<Props> = props => {
  const [windowWidthBound, setWindoWidthBound] = useState(0);
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const [dropx, setdropx] = useState(0);

  useEffect(() => {
    setWindoWidthBound(window.innerWidth / 10);
    if (dropx > 100) {
      handle(dropx);
    }
  }, [dropx]);

  // 1. we define the drag gesture logic using the useDrag hook
  const bind = useDrag(({ down, delta }) => {
    set({ x: down ? delta[0] : 0, y: down ? delta[1] : 0 });
    if (!down) {
      setdropx(delta[0]);
    }
  });

  const translate = (x: number, y: number) => {
    return `translate3d(${x}px, ${y}px, 0) rotate(${x / 10}deg)`;
  };

  const handle = async (x: number) => {
    if (x > windowWidthBound) {
      const result = await props.likeFunction({
        variables: { matcheid: props.user!.id }
      });

      if (result && result.data) {
        window.location.href = window.location.href;
      }
    }
  };
  return (
    <Container
      {...bind()}
      style={{
        transform: interpolate([x, y], translate as any),
        backgroundImage: `url(${
          props.user!.pictureUrl ? props.user!.pictureUrl : imageNull
        })`
      }}
      size={props.size}
    >
      <animated.div {...bind()} className={"title1"}>
        {props.user!.name}
      </animated.div>
    </Container>
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
`;
