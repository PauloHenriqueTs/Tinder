import * as React from "react";
import { FaHeart } from "react-icons/fa";
import { Fab, withStyles, Button } from "@material-ui/core";
import styled from "styled-components";

const WrapperHeart = styled(FaHeart)`
  color: #fff;
`;
const StyledButton = styled(({ ...otherProps }) => <Button {...otherProps} />)`
  && {
    background: linear-gradient(
      to right,
      #fe6b8b 0%,
      #a40d0d 50%,
      #ff8e53 100%
    );
  }
`;

export const Welcome: React.SFC<any> = props => {
  return (
    <div>
      <StyledButton variant="contained">hghfgfg</StyledButton>
      <Fab>
        <WrapperHeart />
      </Fab>
    </div>
  );
};
