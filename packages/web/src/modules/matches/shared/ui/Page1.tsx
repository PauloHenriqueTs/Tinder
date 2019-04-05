import * as React from "react";
import { Field } from "formik";

import { InputField } from "../../../../modules/shared/InputField";
import { DropzoneField } from "../../../shared/DropzoneField";

import { LocationField } from "../../../shared/LocationField";

export const Page1 = () => (
  <>
    <Field name="picture" component={DropzoneField} />
    <Field
      style={{ marginTop: "1em" }}
      name="name"
      placeholder="Name"
      component={InputField}
    />
    <Field
      style={{ height: "6em" }}
      name="description"
      placeholder="Description"
      component={InputField}
    />
    <Field name="tmp" component={LocationField} />
  </>
);
