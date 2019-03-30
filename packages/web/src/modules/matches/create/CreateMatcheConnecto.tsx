import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { FormikActions } from "formik";
import { withCreateMatche, WithCreateMatche } from "@tinder/controller";
import { ListingFormValues, ListingForm } from "../shared/ListingForm";

class C extends React.PureComponent<
  RouteComponentProps<{}> & WithCreateMatche
> {
  submit = async (
    values: ListingFormValues,
    { setSubmitting }: FormikActions<ListingFormValues>
  ) => {
    await this.props.createMatche(values);
    setSubmitting(false);
  };

  render() {
    return <ListingForm submit={this.submit} />;
  }
}

export const CreateMatcheConnector = withCreateMatche(C);
