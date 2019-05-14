import * as React from "react";
import { withFormik, FormikProps, Field, Form } from "formik";
import { Button, Typography, Paper, InputLabel } from "@material-ui/core";
import styled from "styled-components";

import { NormalizedErrorMap } from "@tinder/controller";

import { InputFieldLogin } from "../InputField/InputFieldLogin";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  onFinish: () => void;
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form>
        <Container>
          <StyledTypography variant="h4">Login</StyledTypography>

          <Field
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            placeholder="Email"
            primary={true}
            component={InputFieldLogin}
          />

          <Field
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            name="password"
            placeholder="Password"
            primary={true}
            component={InputFieldLogin}
          />
          <StyledButton type="submit" variant="outlined">
            Login
          </StyledButton>
        </Container>
      </Form>
    );
  }
}

export const LoginView = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);

    if (errors) {
      const isnotEmpty = Object.keys(errors).length === 0;
      if (isnotEmpty) {
        props.onFinish();
      } else {
        setErrors(errors);
      }
    }
  }
})(C);

const Container = styled(({ ...otherProps }) => <Paper {...otherProps} />)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 10vh 10vh;
  && {
    -webkit-box-shadow: 4px 6px 11px -4px #000000;
    box-shadow: 4px 6px 11px -4px #000000;
  }
`;
const StyledTypography = styled(({ ...otherProps }) => (
  <Typography {...otherProps} />
))`
  && {
    background: red;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const StyledButton = styled(({ ...otherProps }) => <Button {...otherProps} />)`
  && {
    margin-top: 2vh;
    :hover {
      color: red;
      border-color: red;
      background-color: white;
    }
  }
`;
