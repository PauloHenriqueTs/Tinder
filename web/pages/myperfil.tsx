import React from "react";
import { Container } from "../components/ContainerStyle";
import { SideBar } from "../components/view/Sidebar";

import { withAuth } from "../components/controller/withAuth";
import { MePerfilView } from "../components/view/MePerfilView";

class Perfil extends React.Component<any> {
  render() {
    const { me } = this.props;
    return (
      <Container>
        <SideBar user={me} size={"33vw"} />
        <MePerfilView user={me} size={"33vw"} />
        <div />
      </Container>
    );
  }
}
export default withAuth(Perfil);
