import React from "react";
import { Container } from "../components/ContainerStyle";
import { SideBar } from "../components/view/Sidebar";
import { withAuth } from "../components/controller/withAuth";
import { MatcheModel } from "../components/test/MatcheModel";

class Matches extends React.Component<any> {
  render() {
    const { me } = this.props;
    return (
      <Container>
        <SideBar user={me} size={"33vw"} />
        <MatcheModel />

        <div />
      </Container>
    );
  }
}

export default withAuth(Matches);
