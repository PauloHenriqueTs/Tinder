import * as React from "react";
import { adopt } from "react-adopt";

import {
  AddNewMessageProps,
  FindMessagesProps,
  AddNewMessageComponent,
  FindMessagesComponent,
  NewMessagesDocument,
  MeMe,
  MatcheUserComponent,
  MatcheUserProps
} from "../../generated/apolloComponents";
import styled from "styled-components";
import { Formik, Field } from "formik";
import { InputField } from "../fields/InputField";
import Router from "next/router";

interface Props {
  size: string;
  id: string;
  user: MeMe;
}

interface RenderProps {
  AddNewMessageMutation: AddNewMessageProps;

  FindMessagesQuery: FindMessagesProps;
  MatcheUserQuery: MatcheUserProps;
}

interface State {
  unsubscribe: any | null;
}

const imageNull = "/static/ImageNull.png";

export class MessagesController extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      unsubscribe: null
    };
  }
  componentDidMount() {
    this.setState({ unsubscribe: null });
  }
  render() {
    const Composed = adopt<RenderProps, {}>({
      AddNewMessageMutation: ({ render }) => (
        <AddNewMessageComponent>
          {(addNewMessage, result) =>
            render ? render({ addNewMessage, result }) : null
          }
        </AddNewMessageComponent>
      ),

      FindMessagesQuery: ({ render }) => (
        <FindMessagesComponent variables={{ matcheid: this.props.id }}>
          {render}
        </FindMessagesComponent>
      ),
      MatcheUserQuery: ({ render }) => (
        <MatcheUserComponent variables={{ matcheid: this.props.id }}>
          {render}
        </MatcheUserComponent>
      )
    });

    return (
      <Composed>
        {({
          FindMessagesQuery: { loading, data, subscribeToMore },
          MatcheUserQuery,
          AddNewMessageMutation: { addNewMessage }
        }) => {
          let unsubscribe = this.state.unsubscribe;
          const matche = MatcheUserQuery!.data!.matcheuser;
          const { user } = this.props;
          if (loading || MatcheUserQuery.loading) {
            return null;
          }

          if (!unsubscribe) {
            unsubscribe = subscribeToMore({
              document: NewMessagesDocument,
              variables: { matcheid: this.props.id },
              updateQuery: (prev: any, { subscriptionData }: any) => {
                if (!subscriptionData.data) return prev;
                const { newMessages } = subscriptionData.data;

                if (
                  prev.findMessage[prev.findMessage.length - 1] &&
                  prev.findMessage[prev.findMessage.length - 1].date ===
                    newMessages.date
                ) {
                  return prev;
                } else {
                  return {
                    ...prev,
                    findMessage: [...prev.findMessage, newMessages]
                  };
                }
              }
            });
          }
          if (data) {
            return (
              <Container size={this.props.size}>
                <div className={"info"}>
                  <img
                    src={matche.pictureUrl ? matche.pictureUrl : imageNull}
                  />

                  <div>{matche.name}</div>
                  <button onClick={() => Router.push("/matches")}>X</button>
                </div>
                <div className={"messages-content"}>
                  {data
                    ? data.findMessage.map((d: any, index: number) => {
                        const mes =
                          data.findMessage[data.findMessage.length - 1 - index];

                        return (
                          <div
                            className={
                              user!.id === mes.userId
                                ? "message-me"
                                : "message-matche"
                            }
                            key={index}
                          >
                            {mes.text}
                          </div>
                        );
                      })
                    : null}
                </div>

                <Formik
                  onSubmit={async data => {
                    if (data.text !== "") {
                      await addNewMessage({
                        variables: { text: data.text, matcheid: matche.id }
                      });
                    }
                  }}
                  initialValues={{
                    text: ""
                  }}
                >
                  {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className={"form"}>
                      <Field
                        name="text"
                        placeholder="text"
                        component={InputField}
                        autoComplete="off"
                      />

                      <button className={"buttonform"} type="submit">
                        submit
                      </button>
                    </form>
                  )}
                </Formik>
              </Container>
            );
          } else {
            return <div />;
          }
        }}
      </Composed>
    );
  }
}

const Container = styled.div`
  width: ${(props: { size: string }) => props.size};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  .messages-content {
    overflow-y: scroll;

    display: flex;

    flex-direction: column-reverse;
    ::-webkit-scrollbar {
      width: 0 !important;
    }
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }
  .input {
    height: 20%;
    background-color: red;
  }
  .info {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 10%;
    border-style: solid;
    border-width: 0px 0 0.05rem 0px;
    border-color: rgba(100, 100, 107, 0.4);
  }

  .info img {
    width: 5%;
    height: 90%;
    border-radius: 50%;

    display: block;
    margin: 0 1rem;
  }
  .info button {
    width: 5%;
    height: 90%;
    border-radius: 50%;
    background-color: transparent;
    border: 0px;
    font-size: 2rem;
    display: block;
    margin: 0 1rem;
  }
  .message-matche {
    display: flex;
    justify-content: flex-start;
    background: linear-gradient(0deg, #dadada, #d0d0d0 60%, #b0b0b0);
    margin-right: auto;
    color: #3c3c3c;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    height: 100%;
    max-width: 82%;
    padding: 0.7rem;
    border-radius: 0.7rem;
  }
  .message-me {
    justify-content: flex-end;
    display: flex;
    margin-left: auto;
    background: linear-gradient(0deg, #76cbed, #51c0ef 60%, #03a9f4);
    color: #3c3c3c;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    height: 100%;
    max-width: 82%;
    padding: 0.7rem;
    border-radius: 0.7rem;
  }

  .buttonform {
    flex: 1;
    height: 90%;
    margin: 0;
    padding: 0;
    outline: none;
    background: #7f8ff4;
    color: #fff;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    &:hover {
      background: darken(#7f8ff4, 4%);
    }

    &:active {
      background: #7f8ff4;
      box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.2);
      border-color: transparent;
    }
    margin-top: 10px;
    margin-left: -96px;
    margin-bottom: 10px;
  }

  .form {
    align-self: flex-end;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;

    margin: 0 0 2% 0;
    padding: 0;
    border: 0;
  }
  .form div {
    flex: 5;
  }
`;
