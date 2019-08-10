import * as React from "react";
import { MatcheModelProps } from "./MatcheModel";
import { FindUserFinduser } from "../../generated/apolloComponents";
import MatcheViewController from "./MatcheViewController";
import { Gesture } from "react-with-gesture";
import { Spring, animated } from "react-spring/renderprops.cjs";

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

      return res;
    }
  };
  componentDidMount() {
    const {
      FindMatcherSubscription: { data },
      LikeMutation: { like },
      PickUserMutation: { pickuser }
    } = this.props.composed;

    if (!data) {
      pickuser();
    }
  }

  render() {
    const {
      FindMatcherSubscription: { data },
      LikeMutation: { like },
      PickUserMutation: { pickuser }
    } = this.props.composed;

    if (data) {
      if (data.finduser) {
        return (
          <Gesture>
            {({ down, delta, first }) => (
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
                      console.log(delta[0]);
                      if (delta[0] > 200) {
                        await like({
                          variables: { matcheid: data.finduser.id }
                        });
                      }
                    }}
                  >
                    {data.finduser.id}
                    <MatcheViewController
                      matche={data.finduser}
                      x={x}
                      y={y}
                      down={down}
                      first={first}
                      like={this.like}
                    />
                  </animated.div>
                )}
              </Spring>
            )}
          </Gesture>
        );
      }
      return <div>ruim</div>;
    } else {
      return <div>fgfgfdfg</div>;
    }
  }
}
