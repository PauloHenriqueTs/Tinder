import redirect from "../lib/redirect";
import { MyContext } from "../interfaces/MyContext";
import { meQuery } from "../graphql/user/queries/me";
import { MeQuery } from "../generated/apolloComponents";
const IndexPage = () => {
  return null;
};

IndexPage.getInitialProps = async ({ apolloClient, ...ctx }: MyContext) => {
  const { data } = await apolloClient.query<MeQuery>({ query: meQuery });

  if (!data.me) {
    redirect(ctx, "/login");
  } else {
    redirect(ctx, "/matches");
  }
  return {};
};

export default IndexPage;
