import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { LoginView } from "./LoginView";
import { Container } from "../container";
storiesOf("Login View", module).add("basic example", () => (
  <Container>
    <LoginView onFinish={action("clicked")} submit={() => null} />
  </Container>
));
