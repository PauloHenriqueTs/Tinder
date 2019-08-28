import { Field, Formik } from "formik";
import React from "react";

import { RegisterField } from "../fields/RegisterField";
import {
  RegisterComponent,
  RegisterVariables,
  RegisterProps
} from "../../generated/apolloComponents";
import { normalizeErrors } from "../../utils/normalizeErrors";
import Router from "next/router";
import styled from "styled-components";
import Link from "next/link";

export default () => {
  return (
    <RegisterComponent>
      {register => (
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (
            { name, email, password }: RegisterVariables,
            { setErrors }
          ) => {
            const { data }: RegisterProps = await register({
              variables: {
                name,
                email,
                password
              }
            });
            if (data.register) {
              const error = normalizeErrors(data.register);
              if (error) {
                setErrors(error);
              }
            } else {
              Router.push("/login");
            }
          }}
          initialValues={{
            email: "",
            name: "",
            password: ""
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="name" placeholder="name" component={RegisterField} />

              <Field
                name="email"
                placeholder="email"
                component={RegisterField}
              />
              <Field
                name="password"
                placeholder="password"
                type="password"
                component={RegisterField}
              />
              <Btn type="submit">submit</Btn>

              <Link href="/login">
                <Div>Sign in</Div>
              </Link>
            </form>
          )}
        </Formik>
      )}
    </RegisterComponent>
  );
};

const Btn = styled.button`
  height: 100%;
  width: 100%;
  border: 0;
  background-color: linear-gradient(
    to right,
    #fe6b8b 0%,
    #f75006 68%,
    #ff8e53 100%
  );
  outline: none;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;

const Div = styled.button`
  height: 100%;
  width: 100%;
  border: 0;
  background: #f1f1f1;
`;
