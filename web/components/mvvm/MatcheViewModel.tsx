import * as React from "react";
import { MatcheModelProps } from "./MatcheModel";
import { FindUserFinduser } from "../../generated/apolloComponents";
import MatcheViewController from "./MatcheViewController";
import { Gesture } from "react-with-gesture";
import { Spring, animated } from "react-spring/renderprops.cjs";
import Router from "next/router";

export interface MatcheViewModelProps {
  composed: MatcheModelProps;
}

export interface MatcheViewModelState {
  matche: FindUserFinduser | null;
}

export default class MatcheViewModel extends React.Component<
  MatcheViewModelProps,
  MatcheViewModelState
> {
  constructor(props: MatcheViewModelProps) {
    super(props);

    this.state = {
      matche: null
    };
  }

  like = async (matcheid: string) => {
    const { LikeMutation } = this.props.composed;
    if (LikeMutation) {
      const res = await LikeMutation.like({
        variables: { matcheid: matcheid }
      });
      if (res.data.like) {
        Router.push(`/matches/messages/${matcheid}`);
      }
      return res;
    }
  };
  deslike = async (matcheid: string) => {
    const { DeslikeMutation } = this.props.composed;
    if (DeslikeMutation) {
      const res = await DeslikeMutation.deslike({
        variables: { matcheid: matcheid }
      });

      return res;
    }
  };
  componentDidMount() {
    const {
      FindMatcherSubscription: { data },
      PickUserMutation: { pickuser }
    } = this.props.composed;

    if (!data) {
      pickuser();
    }
  }

  render() {
    const {
      FindMatcherSubscription: { data },
      LikeMutation: { like }
    } = this.props.composed;

    if (data) {
      if (data.finduser) {
        return (
          <Gesture>
            {({ down, delta }) => (
              <Spring
                native
                to={{
                  x: down ? delta[0] : 0,
                  y: down ? delta[1] : 0
                }}
                immediate={name => down && name === "x"}
              >
                {({ x, y }) => (
                  <animated.div
                    onClick={async () => {
                      if (delta[0] > 200) {
                        await like({
                          variables: { matcheid: data.finduser.id }
                        });
                      }
                    }}
                  >
                    <MatcheViewController
                      matche={data.finduser}
                      x={x}
                      y={y}
                      like={this.like}
                      deslike={this.deslike}
                    />
                  </animated.div>
                )}
              </Spring>
            )}
          </Gesture>
        );
      }
      return <div>Sorry, you don't have users near you.</div>;
    } else {
      return <div>loading...</div>;
    }
  }
}
