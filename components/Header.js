import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Router from "next/router";
import Logout from "./logout";
import Cookies from "js-cookie";
import { DataMain } from "@/components/DataMain";


export default function Header() {
  const { user_name, user_token, user_refresh_token, cook } = useContext(DataMain);

  const [data, SetData] = useState(false)
  useEffect(() => {
    let sam = Cookies.get('2f416677-858f-796a-a221-690e5e4ae75a-token') ? JSON.parse(Cookies.get("2f416677-858f-796a-a221-690e5e4ae75a-token")) : undefined;
    if(sam !== undefined) {
      SetData(true)
    }
  }, [data])

  

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link href="/" className="logo d-flex align-items-center">
          <Image src="/assets/img/logo.png" alt="" width={40} height={40} priority/>
          <span className="d-none d-lg-block"><span className="bleu">Alissa</span> <sub className="jaune">Doc</sub></span>
        </Link>
        <i className="bi bi-list toggle-sidebar-btn" />
      </div>
     
      
     
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          
         
          <li className="nav-item dropdown pe-3">
            <Link
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <button className="btn btn-primary">Options</button>
              <span className="d-none d-md-block dropdown-toggle ps-2">
               
              </span>
            </Link>
            
            {/* End Profile Iamge Icon */}
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                {user_name && <h6>{user_name}</h6>}
                {cook && <h6>{cook}</h6>}
                
                
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="https://samnklcf.netlify.com"
                  
                >
                  <i className="bi bi-person" />
                  <span>Qui m&apos;a développé ?</span>
                </Link>
              </li>
              
              <li>
                <hr className="dropdown-divider" />
              </li>
              {data && <Logout />}
              

              
              
              
              
            </ul>
            {/* End Profile Dropdown Items */}
          </li>
          {/* End Profile Nav */}
        </ul>
      </nav>
      {/* End Icons Navigation */}
    </header>
  );
}
