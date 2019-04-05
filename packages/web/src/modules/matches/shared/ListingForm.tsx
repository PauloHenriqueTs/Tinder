import * as React from "react";
import { Form as AntForm, Button, Card } from "antd";
import { Form, Formik, FormikActions } from "formik";
import { ImageFile } from "react-dropzone";

import { Page1 } from "./ui/Page1";
import { RedColor } from "../../TextPage";
const FormItem = AntForm.Item;

export interface ListingFormValues {
  pictureUrl: string | null;
  picture: ImageFile | null;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  likes: string[] | null;
  deslikes: string[] | null;
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
  longitude: 0,
  likes: [],
  deslikes: []
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
            <Card style={{ width: 400, margin: "auto" }}>
              {pages}
              <FormItem>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end"
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting}
                    style={{
                      position: "fixed",
                      left: "44%",
                      background: RedColor,
                      borderColor: "#FFFFFF"
                    }}
                  >
                    create listing
                  </Button>
                </div>
              </FormItem>
            </Card>
          </Form>
        )}
      </Formik>
    );
  }
}
