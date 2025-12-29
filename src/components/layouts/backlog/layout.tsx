import React from "react";
import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="wrapper py-4">{children}</main>
    </div>
  );
};

export default Layout;
