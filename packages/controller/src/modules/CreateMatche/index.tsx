import { graphql } from "react-apollo";

import {
  CreateMatcheDocument,
  CreateMatcheMutation,
  CreateMatcheMutationVariables
} from "../../types";

export interface WithCreateMatche {
  createMatche: (variables: CreateMatcheMutationVariables) => void;
}

export const withCreateMatche = graphql<
  any,
  CreateMatcheMutation,
  CreateMatcheMutationVariables,
  WithCreateMatche
>(CreateMatcheDocument, {
  props: ({ mutate }) => ({
    createMatche: async variables => {
      if (!mutate) {
        console.log("bad");
        return;
      }
      console.log(variables);
      const response = await mutate({
        variables
      });
      console.log(response);
      return;
    }
  })
});
