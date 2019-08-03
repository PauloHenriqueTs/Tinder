import redirect from "../lib/redirect";
import { MyContext } from "../interfaces/MyContext";

const IndexPage = () => {
  return null;
};

IndexPage.getInitialProps = async ({ ...ctx }: MyContext) => {
  redirect(ctx, "/FacebookLogin");
  return {};
};

export default IndexPage;
