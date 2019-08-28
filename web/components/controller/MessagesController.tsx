import * as React from "react";
import { adopt } from "react-adopt";

import {
  CreateMessageProps,
  CreateMessageComponent,
  MessagesComponent,
  MessagesProps,
  MeMe,
  MatcheUserComponent,
  MatcheUserProps,
  NewMessageDocument
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
  CreateMessageMutation: CreateMessageProps;

  MessagesQuery: MessagesProps;
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
      CreateMessageMutation: ({ render }) => (
        <CreateMessageComponent>
          {(createMessage, result) =>
            render ? render({ createMessage, result }) : null
          }
        </CreateMessageComponent>
      ),

      MessagesQuery: ({ render }) => (
        <MessagesComponent variables={{ matcheid: this.props.id }}>
          {render}
        </MessagesComponent>
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
          MessagesQuery: { loading, data, subscribeToMore },
          MatcheUserQuery,
          CreateMessageMutation: { createMessage }
        }) => {
          let unsubscribe = this.state.unsubscribe;
          const matche = MatcheUserQuery!.data!.matcheuser;
          const { user } = this.props;
          if (loading || MatcheUserQuery.loading) {
            return null;
          }

          if (!unsubscribe) {
            unsubscribe = subscribeToMore({
              document: NewMessageDocument,
              variables: { matcheid: this.props.id },
              updateQuery: (prev: any, { subscriptionData }: any) => {
                if (!subscriptionData.data) return prev;
                const { newMessage } = subscriptionData.data;

                if (
                  prev.messages[prev.messages.length - 1] &&
                  prev.messages[prev.messages.length - 1].date ===
                    newMessage.date
                ) {
                  return prev;
                } else {
                  return {
                    ...prev,
                    messages: [...prev.messages, newMessage]
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
                    ? data.messages.map((d: any, index: number) => {
                        const mes =
                          data.messages[data.messages.length - 1 - index];

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
                      await createMessage({
                        variables: {
                          message: { matcheId: matche.id, text: data.text }
                        }
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
    height: 80%;
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
    height: 20%;
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
    height: 10%;
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
    height: 10%;
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
    height: 15%;

    margin: 0 0 2% 0;
    padding: 0;
    border: 0;
  }
  .form div {
    flex: 5;
  }
`;
