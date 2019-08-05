import React from "react";
import { Container } from "../components/ContainerStyle";
import { SideBar } from "../components/view/Sidebar";
import { withAuth } from "../components/controller/withAuth";
import { MatchesController } from "../components/controller/MatchesController";

class Matches extends React.Component<any> {
  render() {
    const { me } = this.props;
    return (
      <Container>
        <SideBar user={me} size={"33vw"} />
        <MatchesController size={"33vw"} />
        <div />
      </Container>
    );
  }
}

export default withAuth(Matches);
