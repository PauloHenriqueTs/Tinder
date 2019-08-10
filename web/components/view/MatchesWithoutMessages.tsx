import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { MeMe } from "../../generated/apolloComponents";

const imageNull = "/static/ImageNull.png";

interface Props {
  user: MeMe;
  matches: Boolean;
}

export const MatchesWithoutMessage: FunctionComponent<Props> = props => {
  if (props.matches && props.user && props.user.matches) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        {props.user.matches.map((m, index) =>
          !m.lastMessage ? (
            <Content id={m.User!.id} key={index}>
              <Img url={m.User!.pictureUrl ? m.User!.pictureUrl : imageNull}>
                <ContentText>{m.User!.name}</ContentText>
              </Img>
            </Content>
          ) : (
            <div key={index} />
          )
        )}
      </div>
    );
  } else {
    return <div />;
  }
};

const Img = styled.div`
  margin-top: 5vh;
  margin-right: 1vw;
  width: 10vw;
  height: 25vh;
  background-image: url(${(props: { url: string }) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &:hover {
    transform: scale(1.05);
  }
`;
const Content = styled.div`
  padding: 0;
  margin-left: 0.3rem;
`;
const ContentText = styled.div`
  position: relative;
  top: 70%;
  left: 10%;
  right: 0px;
  font-size: 1.5rem;
  font-weight: bold;
`;
