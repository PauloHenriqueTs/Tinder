import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { MeUser } from "../../generated/apolloComponents";

interface Props {
  user: MeUser;
  size?: string;
}
interface ContainerProps {
  size: string;
}
const imageNull = "/static/ImageNull.png";

export const PerfilView: FunctionComponent<Props> = props => {
  return (
    <div style={{ marginTop: "1vh" }}>
      <Container
        className="card"
        id={"overlay1"}
        size={props.size ? props.size : "10vw"}
      >
        <Center>
          <img
            src={props.user.pictureUrl ? props.user.pictureUrl : imageNull}
          />
        </Center>
        <p className="title1">{props.user.name}</p>
        <div className="line" />
        <p className="title">{props.user.bio ? props.user.bio : " "}</p>
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: ${(props: ContainerProps) => props.size};
  height: 95vh;
  margin: 0px;
  border: 0.01rem solid black;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
  overflow-x: hidden;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  margin: auto;
  border-radius: 1rem;
  img {
    margin-top: 1rem;
    width: 100%;
    margin-top: 0;
    height: 100%;
  }
  .title1 {
    margin-left: 0.5rem;

    font-size: 1.5rem;
    white-space: pre-wrap;
  }
  .title {
    margin-left: 0.5rem;
    color: grey;
    font-size: 18px;
    white-space: pre-wrap;
  }
  .line {
    border: 0.02rem solid lightgray;
  }
`;

const Center = styled.div`
  text-align: center;
`;
