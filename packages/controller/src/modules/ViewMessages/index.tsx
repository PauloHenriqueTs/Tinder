import * as React from "react";
import { Query } from "react-apollo";

import {
  Message,
  ViewMessagesQuery,
  ViewMessagesQueryVariables,
  ViewMessagesDocument,
  NewMessageSubscriptionDocument
} from "../../types";

export interface WithViewMessages {
  messages: Message[];
  loading: boolean;
  subscribe: () => () => void;
}

interface Props {
  matcheId: string;
  children: (data: WithViewMessages) => JSX.Element | null;
}
export class ViewMessages extends React.PureComponent<Props> {
  render() {
    const { children, matcheId } = this.props;
    return (
      <Query<ViewMessagesQuery, ViewMessagesQueryVariables>
        query={ViewMessagesDocument}
        variables={{ matcheId }}
      >
        {({ data, loading, subscribeToMore }) => {
          let messages: Message[] = [];

          if (data && data.messages) {
            messages = data.messages;
          }

          return children({
            messages,
            loading,
            subscribe: () =>
              subscribeToMore({
                document: NewMessageSubscriptionDocument,
                variables: { matcheId },
                updateQuery: (prev, { subscriptionData }) => {
                  console.log("prev", prev);
                  console.log("subscriptionData", subscriptionData);

                  if (!subscriptionData.data) {
                    return prev;
                  }

                  // update prev with new data
                  return {
                    ...prev,
                    messages: [
                      ...prev.messages,
                      (subscriptionData.data as any).newMessage
                    ]
                  };
                }
              })
          });
        }}
      </Query>
    );
  }
}
