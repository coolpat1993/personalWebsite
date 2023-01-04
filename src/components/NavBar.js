import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="navBar">
        <div className="navBar-container">
            <Link to="/" className="navBar-logo">
                TRVL
            </Link>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
