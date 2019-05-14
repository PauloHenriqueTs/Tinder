import * as React from "react";
import { FieldProps } from "formik";
import { Input, FormHelperText, FormControl } from "@material-ui/core";
import styled from "styled-components";

import { InputProps } from "@material-ui/core/Input/Input";
import StyledInputLabel from "./CustomInputField";

export const InputFieldLogin: React.FC<FieldProps & InputProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  return (
    <Styled>
      <StyledInputLabel placeholder={props.placeholder} />
      {console.log(props.placeholder)}
      <StyledInput {...field} {...props} />
      {errorMsg ? (
        <FormHelperText id="component-error-text">Error</FormHelperText>
      ) : null}
    </Styled>
  );
};

const StyledInput = styled(({ ...otherProps }) => <Input {...otherProps} />)`
  && {
    flex-basis: 10px;
    margin-bottom: 6vh;
    border: red;
    :after {
      border-color: ${props => (props.primary ? "red" : "#282c34")};
    }
  }
`;

const Styled = styled(({ ...otherProps }) => <FormControl {...otherProps} />)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
