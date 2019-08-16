import * as React from "react";
import { meQuery } from "../../graphql/user/queries/me";
import { MyContext } from "../../interfaces/MyContext";
import { MeQuery } from "../../generated/apolloComponents";
import redirect from "../../lib/redirect";

export const withAuth = <T extends object>(C: React.ComponentClass<T>) => {
  return class AuthComponent extends React.Component<T> {
    static async getInitialProps({ apolloClient, ...ctx }: MyContext) {
      const response = await apolloClient.query<MeQuery>({ query: meQuery });
      if (!response || !response.data || !response.data.me) {
        redirect(ctx, "/FacebookLogin");
        return {
          me: null,
          query: null
        };
      }

      return {
        me: response.data.me,
        query: ctx.query
      };
    }

    render() {
      return <C {...this.props} />;
    }
  };
};
