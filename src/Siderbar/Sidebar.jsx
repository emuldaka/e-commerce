import React from "react";
import Category from "./Category/Category";
import Price from "./Price/Price";
import Colors from "./Colors/Colors";
import "./Sidebar.css";

function Sidebar() {
  return (
    <>
      <sec className="sidebar">
        <div className="logo-container">
          <h1>🛒</h1>
        </div>

        <Category />
        <Price />
        <Colors />
      </sec>
    </>
  );
}

export default Sidebar;
