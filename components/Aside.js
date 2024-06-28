import React from "react";
import Link from "next/link";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

//#7e3af2
export default function Aside() {
  const [data, SetData] = useState(false);
  useEffect(() => {
    let sam = Cookies.get("2f416677-858f-796a-a221-690e5e4ae75a-token")
      ? JSON.parse(Cookies.get("2f416677-858f-796a-a221-690e5e4ae75a-token"))
      : undefined;
    if (sam !== undefined) {
      SetData(true);
    }
  }, [data]);
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-heading">Menu</li>

        {/* End Profile Page Nav */}
        {data ? (
          <Menu />
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link collapsed" href="https://alissa-ia.netlify.app/">
                <i className="bi bi-house-exclamation" />
                <span>Retour</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link collapse" href="/creation">
                <i className="ri ri-login-box-fill" />
                <span>Créer un compte</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link collapse" href="/login">
                <i className="ri ri-login-box-fill" />
                <span>Se connecter</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}
