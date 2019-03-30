import * as React from "react";
import { Link } from "react-router-dom";
import { Form as AntForm, Button } from "antd";
import { Form, Formik, FormikActions } from "formik";
import { ImageFile } from "react-dropzone";

import { Page1 } from "./ui/Page1";

const FormItem = AntForm.Item;

export interface ListingFormValues {
  pictureUrl: string | null;
  picture: ImageFile | null;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface Props {
  initialValues?: ListingFormValues;
  submit: (
    data: ListingFormValues,
    actions: FormikActions<ListingFormValues>
  ) => Promise<void>;
}

// tslint:disable-next-line:jsx-key
const pages = <Page1 />;

export const defaultListingFormValues = {
  pictureUrl: null,
  picture: null,
  name: "",
  description: "",
  latitude: 0,
  longitude: 0
};

export class ListingForm extends React.PureComponent<Props, any> {
  render() {
    const { submit, initialValues = defaultListingFormValues } = this.props;

    return (
      <Formik<{}, ListingFormValues>
        initialValues={initialValues}
        onSubmit={submit}
      >
        {({ isSubmitting, values }) => (
          <Form style={{ display: "flex" }}>
            {console.log(values)}
            <Link to="/logout">logout</Link>
            <div style={{ width: 400, margin: "auto" }}>
              {pages}
              <FormItem>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end"
                  }}
                >
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={isSubmitting}
                    >
                      create listing
                    </Button>
                  </div>
                </div>
              </FormItem>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
