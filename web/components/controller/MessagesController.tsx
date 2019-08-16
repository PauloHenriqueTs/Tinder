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
                console.log(prev.findMessage[prev.findMessage.length - 1]);
                if (
                  prev.findMessage[prev.findMessage.length - 1].date ===
                  newMessages.date
                )
                  return prev;

                return {
                  ...prev,
                  findMessage: [...prev.findMessage, newMessages]
                };
              }
            });
          }

          return (
            <Container size={this.props.size}>
              <div className={"info"}>
                <img src={matche.pictureUrl ? matche.pictureUrl : imageNull} />
                {matche.name}
              </div>
              <div className={"messages-content"}>
                {data.findMessage.map((d: any, index: number) => {
                  const mes =
                    data.findMessage[data.findMessage.length - 1 - index];
                  return (
                    <div
                      className={
                        user!.id !== mes.userId
                          ? "message-me"
                          : "message-matche"
                      }
                      key={index}
                    >
                      {mes.text}
                    </div>
                  );
                })}
              </div>

              <Formik
                onSubmit={async data => {
                  const response = await addNewMessage({
                    variables: { text: data.text, matcheid: matche.id }
                  });
                }}
                initialValues={{
                  text: ""
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Field
                      name="text"
                      placeholder="text"
                      component={InputField}
                    />

                    <button type="submit">submit</button>
                  </form>
                )}
              </Formik>
            </Container>
          );
        }}
      </Composed>
    );
  }
}

const Container = styled.div`
  width: ${(props: { size: string }) => props.size};
  display: flex;
  flex-direction: column;
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
    justify-content: center;
    height: 15%;
    border-style: solid;
    border-width: 0px 0 0.05rem 0px;
    border-color: rgba(100, 100, 107, 0.4);
  }

  .info img {
    width: 10%;
    border-radius: 50%;

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
`;
