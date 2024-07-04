import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Footer from "@/components/Footer";
import Erreur from "@/components/Erreur";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useState, useRef, useEffect, useContext } from "react"; //prendre
import withAuth from "@/components/hoc/withAuth";
import Cookies from "js-cookie";
import { DataMain } from "@/components/DataMain"; //prendre

export default function Fautes() {
  
  let nom = useRef();
  let defaut = "Entrez le texte et cliquez sur le bouton CORRIGER";

  
  

  const { user_name, user_token, user_refresh_token } = useContext(DataMain); //prendre
  const [sortie, setSortie] = useState(defaut);
  const [loader, setLoader] = useState(false);
  const [desactive, setDesactive] = useState(false);
  const [Saved, SetSaved] = useState(false);
  const [Done, SetDone] = useState(false);


  const handleForm = (e) => {
    e.preventDefault();

    setLoader(true);
    setDesactive(true);
    setSortie("")
    SetSaved(false);
    SetDone(false);
    // setLoader(true)

    

    fetch("https://alissabackendfluidbysamnk-mbrn.onrender.com/api/faute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: nom.current.value
      }),
    })
      .then(async (data) => {
        return data.json();
      })
      .then(async (responses) => {
        

        setSortie(responses);
        setLoader(false);
        setDesactive(false);
        SetSaved(true);
        SetDone(false); //prendre le tas

        
      })
      .catch((err) => {
        setSortie(`<b style="color: red;">Il y a un problème de connexion😣 📶<i>veuillez réessayer</i></b> .\nVeuillez noter que c'est la première version du programme et qu'il peut y avoir des erreurs mineures. Veuillez appuyer sur le bouton de génération
        
        `)
        setLoader(false);
        setDesactive(false);
        SetSaved(false);
        SetDone(false); //prendre le tas
      
        
      })
   
  };

  // ________________________________enregistrer les données ----------------------------------------------------

  async function saved() {
    const updateData = {
      contenu: sortie,
      titre: nom.current.value,
      types: "Fautes",
      genre: "CORRECTIONS",
    };

    if (user_token) {
      let response = await fetch(`https://alissadata.pythonanywhere.com/creer/2f416677-858f-796a-a221-690e5e4ae75a2f416677-858f-796a-a221-690e5e4ae75a`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user_token,
        },
        body: JSON.stringify(updateData),
      });

      let donne = await response.json();
      if (response.ok) {
        SetSaved(donne);
      
        SetDone(true);
      } else {
        Cookies.remove("2f416677-858f-796a-a221-690e5e4ae75a-token", {
          path: "/",
        });
        Cookies.remove("2f416677-858f-796a-a221-690e5e4ae75a-Cooktoken", {
          path: "/",
        })
        window.location.reload();
        Router.push("/login");
       
      }
    }
  }
  // --------------------------------------------------Fin enregistrement----------------------------------------------------------------



  return (
    <>
      <Head>
        <title>Test ia</title>
      </Head>

      <main id="main" className="main">
       
        <div className="pagetitle">
          
          
        </div>
        <Link type="button" className="btn btn-secondary" href={"/"}>Retour</Link>
        <br /><br />
        {/* End Page Title */}
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <iframe src="https://alissa-bot-zkutajntcq-ue.a.run.app/" frameborder="0" width={"100%"} height={700}></iframe>

                  
                  {/* End General Form Elements */}
                </div>
              </div>
            </div>

            {/* -------------------reponse---------------------- */}

            
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
