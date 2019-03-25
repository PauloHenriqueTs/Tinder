import * as React from "react";
import { Mutation } from "react-apollo";
import { LoginMutationDocument, LoginMutationMutation } from "../../types";

interface Props {
  children: (data: { logout: () => void }) => JSX.Element | null;
}

export const LogoutController: React.SFC<Props> = ({ children }) => (
  <Mutation<LoginMutationMutation, {}> mutation={LoginMutationDocument}>
    {(mutate, { client }) =>
      children({
        logout: async () => {
          await mutate();
          await client.resetStore();
        }
      })
    }
  </Mutation>
);
