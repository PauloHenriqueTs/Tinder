import * as React from "react";

import styled from "styled-components";
import { MatcheView } from "../components/adobexd/MatcheView";

export default () => (
  <Container>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <MatcheView user={User.data.me} />
    </div>
  </Container>
);

const Container = styled.div`
  height: 100vh;
  display: flex;

  background-color: #f1f9ff;
  justify-content: center;
`;

const User = {
  data: {
    me: {
      id: "98cfe820-a1f5-4d65-93a5-65607f5edd9d",
      email: "henriquepaulo991@gmail.com",
      name: "Paulo Henrique",
      pictureUrl:
        "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1408852625922509&height=200&width=200&ext=1565814833&hash=AeTP5IegwDoZHWW8",
      bio:
        "fergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgreamfergerghehahsfghshrojhorjtaop[b[mnbl[lnbla nmblm[oagermjgo[´rgjaero[ga[erogaelrgláergl´jaermgoermgerog[ermgream ",
      lastMessage: null,
      like: null,
      deslike: null,
      matches: [
        {
          User: {
            id: "123bb168-45d0-4dad-a873-11278f6f7e36",
            email: "paulo991@gmail.com",
            name: "PAULO",
            pictureUrl: null,
            bio: null,
            lastMessage: null,
            like: null,
            deslike: null
          },
          lastMessage: "hi3"
        },
        {
          User: {
            id: "123bb168-45d0-4dad-a873-11278f6f7e36",
            email: "paulo991@gmail.com",
            name: "PAULO",
            pictureUrl: null,
            bio: null,
            lastMessage: null,
            like: null,
            deslike: null
          },
          lastMessage: "hi3"
        },
        {
          User: {
            id: "123bb168-45d0-4dad-a873-11278f6f7e36",
            email: "paulo991@gmail.com",
            name: "Henrique",
            pictureUrl: null,
            bio: null,
            lastMessage: null,
            like: null,
            deslike: null
          },
          lastMessage: null
        }
      ]
    }
  }
};
