import { FieldProps } from "formik";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputField = ({
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
    height: 100%;
    border: 0;
    border-radius: 2%;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    margin: 0;
    outline: none;
    padding: 0;
  }
`;
