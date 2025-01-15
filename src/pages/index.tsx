import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return <p>Welcome to the World of Investments</p>;
};

Page.getLayout = function getLayout() {
  return <></>;
};

export default Page;
