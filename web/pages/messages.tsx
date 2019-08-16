import React from "react";
import { Container } from "../components/ContainerStyle";
import { SideBar } from "../components/view/Sidebar";

import { withAuth } from "../components/controller/withAuth";
import { MessagesController } from "../components/controller/MessagesController";

class Messages extends React.Component<any> {
  render() {
    const {
      me,
      query: { id }
    } = this.props;
    return (
      <Container>
        <SideBar user={me} size={"33vw"} />
        <MessagesController id={id} size={"77vw"} user={me} />
      </Container>
    );
  }
}
export default withAuth(Messages);
