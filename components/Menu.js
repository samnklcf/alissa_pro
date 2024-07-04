import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
let url = "https://alissa-ia-safe.netlify.app"
let fenetreOuverte = false;



function Menu() {

 
  

  const [content, setContent] = useState(localStorage.getItem("755848fzuefyedhsdj123dzreu__fezufuirg")  ? JSON.parse(localStorage.getItem("755848fzuefyedhsdj123dzreu__fezufuirg")) : '<p><strong>Ajouter du texte</strong></p>');

  const handleEditorChange = (content, editor) => {
    setContent(content);
    localStorage.setItem("755848fzuefyedhsdj123dzreu__fezufuirg", JSON.stringify(content))

  };



  return (
    <div>
      
      {/* End F.A.Q Page Nav */}
      

      

      
      <li className="nav-item">
        <Link className="nav-link collapsed" href="/chatbot">
          <i className="bi bi-envelope bleuSombre" />
          <span>ChatBot</span>
        </Link>
      </li>

      {/* <li className="nav-item">
        <Link className="nav-link collapsed" href="/corrections">
          <i className="bi bi-dash-circle rouge" />
          <span>Corrections</span>
        </Link>
      </li> */}

      <li className="nav-item">
        <Link className="nav-link collapsed" href="https://alissa-ia.netlify.app">
          <i className="bi bi-question vert" />
          <span>Tutoriel</span>
        </Link>
      </li>

      <br />

      <>
        <button
          type="button"
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#disablebackdrop"
        >
          <i className="bx bxs-edit" />
          <span>Rédaction du document</span>
        </button>
        <div
          className="modal fade"
          id="disablebackdrop"
          tabIndex={-1}
          data-bs-backdrop="false"
        >
          <br />
          <br />
         
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              
                
              </div>
              
              <div className="modal-body">
                

                  
                  
                  
              
              </div>
              <div className="modal-footer">
              
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fermer
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Menu;
