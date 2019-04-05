import * as React from "react";
import { ViewMatche } from "@tinder/controller";
import { RouteComponentProps } from "react-router-dom";
import { Card } from "antd";
import { Btnlike, BtnDeslike } from "../../TextPage";
const { Meta } = Card;
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
const like = gql`
  mutation Like($userId: String!) {
    like(userId: $userId)
  }
`;

const deslike = gql`
  mutation DesLike($userId: String!) {
    deslike(userId: $userId)
  }
`;
export class ViewMatchesConnector extends React.PureComponent<
  RouteComponentProps<{
    matcheId: string;
  }>
> {
  render() {
    const {
      match: {
        params: { matcheId }
      }
    } = this.props;
    const state = {
      userid: ""
    };
    return (
      <div>
        <ViewMatche matcheId={matcheId}>
          {data => {
            console.log(data);
            if (!data.matches) {
              return <div>...loading</div>;
            }
            const { id, pictureUrl, name, description, user } = data.matches;
            state.userid = user.id;
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Card
                  key={`${id}-card`}
                  hoverable={true}
                  style={{ flex: 1, maxWidth: "400px" }}
                  cover={pictureUrl && <img alt="example" src={pictureUrl} />}
                >
                  <Meta title={name} description={description} />
                </Card>
              </div>
            );
          }}
        </ViewMatche>
        <Mutation mutation={deslike}>
          {(deslike, data) => (
            <div>
              <BtnDeslike
                onClick={() => deslike({ variables: { userId: state.userid } })}
              />
            </div>
          )}
        </Mutation>
        <Mutation mutation={like}>
          {like => (
            <Btnlike
              onClick={() => like({ variables: { userId: state.userid } })}
            />
          )}
        </Mutation>
      </div>
    );
  }
}
