import * as React from "react";

import { storiesOf } from "@storybook/react";
import { Welcome } from "./Buttons";

storiesOf("Button", module).add("heart", () => (
  <div style={{ display: "inline-block" }}>
    <Welcome />
  </div>
));
