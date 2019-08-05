import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { MeMe } from "../../generated/apolloComponents";
import { MatchesWithoutMessage } from "./MatchesWithoutMessages";
import { MatchesWithMessage } from "./MatchesWithMessages";

const imageNull = "/static/ImageNull.png";

interface Props {
  user: MeMe;
  size: string;
}

export const SideBar: FunctionComponent<Props> = props => {
  const [matches, setMatches] = useState<Boolean>(true);
  return (
    <Container size={props.size}>
      {props.children}
      <ContainerButton>
        <ContentMenu>
          <Button style={{ width: "1rem" }} onClick={() => console.log("ok1")}>
            {"<"}
          </Button>
          <Button onClick={() => console.log("ok")}>
            <Img
              src={props.user.pictureUrl ? props.user.pictureUrl : imageNull}
            />
            <div>My Perfil</div>
          </Button>
        </ContentMenu>
      </ContainerButton>
      <ContentMenu>
        <ButtonMatches onClick={() => setMatches(true)} click={matches}>
          Matches
        </ButtonMatches>
        <ButtonMessages onClick={() => setMatches(false)} click={!matches}>
          Messages
        </ButtonMessages>
        <ButtonMatches />
      </ContentMenu>
      {matches ? (
        <MatchesWithoutMessage matches={matches} user={props.user} />
      ) : (
        <MatchesWithMessage matches={!matches} user={props.user} />
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: ${(props: { size: string }) => props.size};
  z-index: 1;
  top: 0;
  left: 0;
  background-color: transparent;
  overflow-x: hidden;

  border-right: 0.001rem solid #f1f1ff;
  display: flex;
  flex-direction: column;
`;

const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 120px;
  border-radius: 2%;
  border-color: transparent;
  background: linear-gradient(to right, #fe6b8b 0%, #f75006 68%, #ff8e53 100%);
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: transparent;
  color: white;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  font-size: 2rem;
`;

const Img = styled.img`
  height: 10%;
  width: 10%;
  border-radius: 50%;
  border: 0.1rem solid white;
  display: block;
  margin: 0 1rem;
`;

const ButtonMatches = styled.button`
  width: 100%;
  background: transparent;
  color: black;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  margin-top: 1rem;
  font-size: 2rem;
  align-self: auto;
  border-bottom: ${(props: { click?: any }) =>
    props.click ? " 0.1rem solid red" : "none"};
`;
const ButtonMessages = styled.button`
  width: 100%;
  background: transparent;
  color: black;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  margin-top: 1rem;
  font-size: 2rem;
  align-self: auto;
  border-bottom: ${(props: { click: Boolean }) =>
    props.click ? " 0.1rem solid red" : "none"};
`;

const ContentMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
`;
