import * as React from "react";
import { FindUserFinduser } from "../../generated/apolloComponents";
import { MatcheView1 } from "./MatcheView1";
import { PerfilView } from "../view/PerfilView";

export interface MatcheViewControllerProps {
  matche: FindUserFinduser | null;
  down: boolean;
  first: any;
  x: number;
  y: number;
  like: (matcheid: string) => any;
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
    return `translate3d(${x}px, ${y}px, 0) rotate(${x / 10}deg)`;
  };

  public render() {
    const { matche } = this.props;
    const { x, y, showprofile } = this.state;

    console.log(showprofile);
    if (matche) {
      if (!showprofile) {
        return (
          <div onClick={() => this.setState({ showprofile: true })}>
            <MatcheView1
              matche={matche}
              translate={this.translate}
              x={x}
              y={y}
            />
          </div>
        );
      } else {
        return (
          <div onClick={() => this.setState({ showprofile: true })}>
            <PerfilView user={matche} size={"33vw"} />
          </div>
        );
      }
    } else {
      return <div />;
    }
  }
}
