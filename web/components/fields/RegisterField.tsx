import { FieldProps } from "formik";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const RegisterField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <Inputstyle>
      <input {...field} {...props} />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </Inputstyle>
  );
};

const Inputstyle = styled.div`
  height: 100%;
  width: 100%;
  border: 0;
  input {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 4px;
    margin: 5px 0;
    opacity: 0.85;
    display: inline-block;
    font-size: 17px;
    line-height: 20px;
    text-decoration: none; /* remove underline from anchors */
  }

  input:hover {
    opacity: 1;
  }
`;
