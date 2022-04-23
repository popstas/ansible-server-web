import Head from "next/head";
import Topline from "../components/Topline";
import { ReactFCWithChildren } from '../helpers/react';

const Layout: ReactFCWithChildren = ({ children }) => {
  return (
    <>
      <Head>
        <title>ansible-server</title>
        <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1" />
        <link rel="icon" href="/ansible.png" />
      </Head>
      <Topline />
      <div className="container">
        {children}
      </div>
    </>
  );
};

export default Layout;
