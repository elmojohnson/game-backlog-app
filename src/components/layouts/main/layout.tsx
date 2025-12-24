import React from "react";
import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="py-3 wrapper">{children}</main>
    </div>
  );
};

export default Layout;
