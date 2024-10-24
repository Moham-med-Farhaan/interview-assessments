import React from "react";
import PageService from "./page-service";
import Home from "../sections/home";

function Layout() {
  const elements = [
    {
      component: <Home />,
    },
  ];
  return (
    <div>
      {elements.map((el) => {
        return <PageService>{el.component}</PageService>;
      })}
    </div>
  );
}

export default Layout;
