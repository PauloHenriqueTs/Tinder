import * as React from "react";
import * as Antd from "antd";
import { withFormik, FormikErrors, FormikProps, Field, Form } from "formik";
import { validUserSchema } from "@tinder/common";
import { InputField } from "../../shared/InputField";
import { RegisterInput } from "@tinder/controller/dist/types";
import { Link } from "react-router-dom";

const { Form: AntForm, Icon, Button } = Antd;
const FormItem = AntForm.Item;

interface Props {
  onFinish: () => void;
  submit: (
    values: RegisterInput
  ) => Promise<FormikErrors<RegisterInput> | null>;
}

class C extends React.PureComponent<FormikProps<RegisterInput> & Props> {
  render() {
    return (
      <Form
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        <div style={{ width: 400, margin: "0.1em" }}>
          <Field
            name="email"
            prefix={
              <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} /> as any
            }
            placeholder="Email"
            component={InputField}
          />
          <Field
            name="password"
            type="password"
            prefix={
              <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} /> as any
            }
            placeholder="Password"
            component={InputField}
          />

          <FormItem
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <Button htmlType="submit" className="login-form-button">
              Register
            </Button>
          </FormItem>
          <FormItem
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            Or <Link to="/">login</Link>
          </FormItem>
        </div>
      </Form>
    );
  }
}

export const RegisterView = withFormik<Props, RegisterInput>({
  validationSchema: validUserSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
