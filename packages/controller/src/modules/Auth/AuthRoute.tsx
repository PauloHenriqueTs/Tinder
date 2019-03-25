import * as React from "react";
import { graphql, ChildProps } from "react-apollo";
import { RouteProps, Route, RouteComponentProps, Redirect } from "react-router";

import { MeQueryDocument, MeQueryQuery } from "../../types";

type Props = RouteProps;

class C extends React.PureComponent<ChildProps<Props, MeQueryQuery>> {
  renderRoute = (routeProps: RouteComponentProps<{}>) => {
    const { data, component } = this.props;

    if (!data || data.loading) {
      // loading screen
      return null;
    }

    if (!data.me) {
      // user not logged in
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { next: routeProps.location.pathname }
          }}
        />
      );
    }

    const Component = component as any;

    return <Component {...routeProps} />;
  };

  render() {
    const { data: _, component: __, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

export const AuthRoute = graphql<Props, MeQueryQuery>(MeQueryDocument)(C);
