import * as React from "react";
import { FindUserFinduser } from "../../generated/apolloComponents";
import { MatcheView } from "./MatcheView";
import { PerfilView } from "../view/PerfilView";
import { CenterButton } from "../ContainerStyle";
import DeslikeButton from "../view/DeslikeButton";
import LikeButton from "../view/LikeButton";

export interface MatcheViewControllerProps {
  matche: FindUserFinduser | null;

  x: any;
  y: number;
  like: (matcheid: string) => any;
  deslike: (matcheid: string) => any;
}

export interface MatcheViewControllerState {
  matche: FindUserFinduser | null;
  showprofile: boolean;
  x: number;
  y: number;
}

export default class MatcheViewController extends React.Component<
  MatcheViewControllerProps,
  MatcheViewControllerState
> {
  constructor(props: MatcheViewControllerProps) {
    super(props);

    this.state = {
      matche: null,
      showprofile: false,
      x: 0,
      y: 0
    };
  }

  componentWillMount() {
    this.setState({ x: this.props.x, y: this.props.y });
  }

  shouldComponentUpdate(nextpros: MatcheViewControllerProps) {
    const { matche } = this.props;
    if (nextpros.matche === matche) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    const { x, y, matche } = this.props;
    if (matche) {
      if (matche && this.state.x !== x && this.state.y !== y) {
        this.setState({ x: x, y: y });
      }
    }
  }

  translate = (x: number, y: number) => {
    return `translate3d(${x}px, ${y}px, 0) rotate(${(x * -1) / 10}deg)`;
  };

  public render() {
    const { matche } = this.props;
    const { x, y, showprofile } = this.state;

    if (matche) {
      if (!showprofile) {
        return (
          <div>
            <div onClick={() => this.setState({ showprofile: true })}>
              <MatcheView
                matche={matche}
                translate={this.translate}
                x={x}
                y={y}
                like={this.props.like}
                deslike={this.props.deslike}
              />
            </div>

            <CenterButton>
              <DeslikeButton
                onClick={async () => {
                  await this.props.deslike(matche!.id);
                  this.setState({ showprofile: false });
                }}
              />

              <LikeButton
                onClick={async () => {
                  await this.props.like(matche!.id);
                  this.setState({ showprofile: false });
                }}
              />
            </CenterButton>
          </div>
        );
      } else {
        return (
          <div>
            <PerfilView user={matche} size={"33vw"} />
            <CenterButton>
              <DeslikeButton
                onClick={async () => {
                  this.props.deslike(matche!.id);
                  this.setState({ showprofile: false });
                }}
              />

              <LikeButton
                onClick={async () => {
                  this.props.like(matche!.id);
                  this.setState({ showprofile: false });
                }}
              />
            </CenterButton>
          </div>
        );
      }
    } else {
      return <div />;
    }
  }
}
