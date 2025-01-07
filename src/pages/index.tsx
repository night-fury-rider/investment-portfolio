import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>;
};

Page.getLayout = function getLayout() {
  return <></>;
};

export default Page;
