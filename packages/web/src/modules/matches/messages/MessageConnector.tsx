import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ViewMessages } from "@tinder/controller";
import { InputBar } from "./InputBar";

export class MessageConnector extends React.PureComponent<
  RouteComponentProps<{
    matcheId: string;
  }>
> {
  unsubscribe: () => void;

  render() {
    const {
      match: {
        params: { matcheId }
      }
    } = this.props;
    return (
      <ViewMessages matcheId={matcheId}>
        {({ loading, messages, subscribe }) => {
          if (loading) {
            return <div>...loading</div>;
          }

          if (!this.unsubscribe) {
            this.unsubscribe = subscribe();
          }

          return (
            <div>
              {messages.map((m, i) => (
                <div key={`${i}-lm`}>{m.text}</div>
              ))}
              <InputBar matcheId={matcheId} />
              <button onClick={this.unsubscribe}>unsubscribe</button>
            </div>
          );
        }}
      </ViewMessages>
    );
  }
}
