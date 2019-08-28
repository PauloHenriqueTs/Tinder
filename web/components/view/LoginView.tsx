import { Field, Formik } from "formik";
import React from "react";

import { RegisterField } from "../fields/RegisterField";
import {
  LoginVariables,
  LoginComponent,
  LoginProps
} from "../../generated/apolloComponents";
import { normalizeErrors } from "../../utils/normalizeErrors";
import Router from "next/router";
import styled from "styled-components";
import Link from "next/link";

export default () => {
  return (
    <LoginComponent>
      {login => (
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (
            { email, password }: LoginVariables,
            { setErrors }
          ) => {
            const {
              data: {
                login: { errors }
              }
            }: LoginProps = await login({
              variables: {
                email,
                password
              }
            });
            if (errors) {
              const error = normalizeErrors(errors);
              if (error) {
                setErrors(error);
              }
            } else {
              Router.push("/matches");
            }
          }}
          initialValues={{
            email: "",
            password: ""
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
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
              <Btn type="submit">Login</Btn>
              <Link href="/register">
                <Div>Sign out</Div>
              </Link>
            </form>
          )}
        </Formik>
      )}
    </LoginComponent>
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
