import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

import { red } from "@material-ui/core/colors";

const styles = (theme: Theme) =>
  createStyles({
    cssLabel: {
      "&$cssFocused": {
        color: red[500]
      }
    },
    cssFocused: {}
  });

export interface Props extends WithStyles<typeof styles> {
  placeholder: string;
}

function CustomizedInputs(props: Props) {
  const { classes } = props;

  return (
    <InputLabel
      htmlFor={props.placeholder}
      classes={{
        root: classes.cssLabel,
        focused: classes.cssFocused
      }}
    >
      {props.placeholder}
    </InputLabel>
  );
}

export default withStyles(styles)(CustomizedInputs);
