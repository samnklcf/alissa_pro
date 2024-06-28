import React from "react";
import Router from "next/router";
import withAuth from "./hoc/withAuth";
import Cookies from "js-cookie";

function Logout() {
    const logout = () => {
        Cookies.remove("2f416677-858f-796a-a221-690e5e4ae75a-token", {path: "/"})
        Cookies.remove("2f416677-858f-796a-a221-690e5e4ae75a-Cooktoken", {
          path: "/",
        })
        window.location.reload()
      }
    
  return (
    <div>
      <li onClick={logout} id="dect">
        <span className="dropdown-item d-flex align-items-center">
          <i className="bx bxs-log-out-circle" />
          <span>Se déconnecter</span>
        </span>
      </li>
    </div>
  );
}

export default Logout;
