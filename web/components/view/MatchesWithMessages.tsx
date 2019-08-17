import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { MeMe } from "../../generated/apolloComponents";
import Router from "next/router";

const imageNull = "/static/ImageNull.png";

interface Props {
  user: MeMe;
  matches: Boolean;
}

export const MatchesWithMessage: FunctionComponent<Props> = props => {
  if (props.matches && props.user && props.user.matches) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column"
        }}
      >
        {props.user.matches.map((m, index) =>
          m.lastMessage ? (
            <Content
              id={m.User!.id}
              key={m.User!.id}
              onClick={() => Router.push(`/matches/messages/${m.User!.id}`)}
            >
              <Img url={m.User!.pictureUrl ? m.User!.pictureUrl : imageNull} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column"
                }}
              >
                {console.log(m)}
                <div>{m.User!.name}</div>
                <div style={{ marginTop: "1rem" }}>{m.lastMessage}</div>
              </div>
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
  width: 8vw;
  height: 8vw;
  border-radius: 50%;
  background-image: url(${(props: { url: string }) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;
const Content = styled.div`
  margin-top: 5vh;
  margin-right: 1vw;
  display: flex;
  padding: 0;
  &:hover {
    border-right: 0.5rem solid red;
  }
`;
