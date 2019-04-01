import * as React from "react";
import { ViewMatche, UpdateMatche } from "@tinder/controller";
import { RouteComponentProps } from "react-router-dom";
import { ListingForm, defaultListingFormValues } from "../shared/ListingForm";

export class EditMatcheConnector extends React.PureComponent<
  RouteComponentProps<{
    matcheId: string;
  }>
> {
  render() {
    const {
      match: {
        params: { matcheId }
      }
    } = this.props;
    return (
      <ViewMatche matcheId={matcheId}>
        {data => {
          console.log(data);
          if (!data.matches) {
            return <div>...loading</div>;
          }

          const { id: _, user: ___, ...listing } = data.matches;

          return (
            <UpdateMatche>
              {({ updateListing }) => (
                <ListingForm
                  initialValues={{
                    ...defaultListingFormValues,
                    ...listing
                  }}
                  submit={async values => {
                    const { __typename: ____, ...newValues } = values as any;

                    if (newValues.pictureUrl) {
                      const parts = newValues.pictureUrl.split("/");
                      newValues.pictureUrl = parts[parts.length - 1];
                    }

                    const result = await updateListing({
                      variables: {
                        input: newValues,
                        matcheId
                      }
                    });

                    console.log(result);
                  }}
                />
              )}
            </UpdateMatche>
          );
        }}
      </ViewMatche>
    );
  }
}
