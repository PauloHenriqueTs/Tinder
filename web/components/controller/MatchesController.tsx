import * as React from "react";
import { adopt } from "react-adopt";
import { MatcheView } from "../view/MatcheView";
import DeslikeButton from "../view/DeslikeButton";
import LikeButton from "../view/LikeButton";
import {
  PickuserProps,
  PickuserComponent,
  FindUserProps,
  FindUserComponent,
  LikeComponent,
  DeslikeComponent,
  LikeProps,
  DeslikeProps,
  PickuserMutationFn
} from "../../generated/apolloComponents";
import { isBrowser } from "../../lib/isBrowser";

interface Props {
  size: string;
}

interface RenderProps {
  PickUserMutation: PickuserProps;
  FindMatcherSubscription: FindUserProps;
  LikeMutation: LikeProps;
  DeslikeMutation: DeslikeProps;
}
interface State {
  query: boolean;
}

export class MatchesController extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: true
    };
  }
  componentDidMount() {
    this.setState({ query: false });
  }
  render() {
    const Composed = adopt<RenderProps, {}>({
      PickUserMutation: ({ render }) => (
        <PickuserComponent>
          {(pickuser, result) => (render ? render({ pickuser, result }) : null)}
        </PickuserComponent>
      ),
      FindMatcherSubscription: ({ render }) => (
        <FindUserComponent>{render}</FindUserComponent>
      ),
      LikeMutation: ({ render }) => (
        <LikeComponent>
          {(like, result) => (render ? render({ like, result }) : null)}
        </LikeComponent>
      ),

      DeslikeMutation: ({ render }) => (
        <DeslikeComponent>{render}</DeslikeComponent>
      )
    });

    return (
      <Composed>
        {({ FindMatcherSubscription, PickUserMutation, LikeMutation }) => {
          if (FindMatcherSubscription!.loading) {
            return (
              <CallPickUser
                pickuser={PickUserMutation.pickuser}
                query={this.state.query}
              >
                <p>ghgfhfgh...</p>
              </CallPickUser>
            );
          }
          if (FindMatcherSubscription!.error || PickUserMutation!.error) {
            return <p>Error...</p>;
          }
          if (
            FindMatcherSubscription!.data &&
            FindMatcherSubscription.data.finduser
          ) {
            console.log(FindMatcherSubscription.data);
            return (
              <div
                style={{
                  display: "flex",
                  marginTop: "15px",
                  flexDirection: "column"
                }}
              >
                <MatcheView
                  user={FindMatcherSubscription.data.finduser}
                  size={this.props.size}
                  likeFunction={LikeMutation.like}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "15px"
                  }}
                >
                  <DeslikeButton />
                  <LikeButton />
                </div>
              </div>
            );
          } else
            return (
              <CallPickUser
                pickuser={PickUserMutation.pickuser}
                query={this.state.query}
              >
                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <p>Sorry don't find anyone near ...</p>
                </div>
              </CallPickUser>
            );
        }}
      </Composed>
    );
  }
}

interface props1 {
  pickuser: PickuserMutationFn;
  query: boolean;
}
class CallPickUser extends React.Component<props1> {
  componentWillMount() {
    if (isBrowser && this.props.query) {
      this.props.pickuser();
    }
  }

  render() {
    // React 16
    return this.props.children;
    // Old School :)
    // return <div>{ this.props.children }</div>
  }
}
