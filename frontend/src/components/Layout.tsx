import React from "react";
import Header from "./Header";
import GDPRConsent from "./GDPRConsent";


const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div>
      <Header/>
      <main className="p-6">{children}</main>
      <GDPRConsent/>
    </div>
  );
};

export default Layout;
