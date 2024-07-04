import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useState, useRef, useEffect, useContext } from "react"; //prendre
import withAuth from "@/components/hoc/withAuth";
import Cookies from "js-cookie";
import { DataMain } from "@/components/DataMain"; //prendre

export default withAuth(function Fautes() {
  let nom = useRef();
  let ton = useRef();

  let defaut = "Entrez le texte et cliquez sur le bouton REFORMULER";

  const { user_name, user_token, user_refresh_token } = useContext(DataMain); //prendre
  const [sortie, setSortie] = useState(defaut);
  const [loader, setLoader] = useState(false);
  const [desactive, setDesactive] = useState(false);
  const [Saved, SetSaved] = useState(false);
  const [Done, SetDone] = useState(false);
  const [content, setContent] = useState('');
  const [newContent, setNewContent] = useState('');
  const [modif, setModif] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();

    setLoader(true);
    setDesactive(true);
    setSortie("");
    SetSaved(false);
    SetDone(false);
    // setLoader(true)

    fetch("https://alissabackendfluidbysamnk-mbrn.onrender.com/api/reformuler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: nom.current.value,
        ton: ton.current.value,
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
        SetDone(false);
        //   setLoader(false)
      })
      .catch((err) => {
        setSortie(`<b style="color: red;">Il y a un problème de connexion😣 📶<i>veuillez réessayer</i></b> .\nVeuillez noter que c'est la première version du programme et qu'il peut y avoir des erreurs mineures. Veuillez appuyer sur le bouton de génération
        
        `);
        setLoader(false);
        setDesactive(false);
        SetSaved(false);
        SetDone(false);
      });
  };

  // ________________________________enregistrer les données ----------------------------------------------------

  async function saved() {
    const updateData = {
      contenu: sortie,
      titre: nom.current.value,
      types: "Reformulation",
      genre: "CORRECTIONS",
    };

    if (user_token) {
      let response = await fetch(
        `https://alissadata.pythonanywhere.com/creer/2f416677-858f-796a-a221-690e5e4ae75a2f416677-858f-796a-a221-690e5e4ae75a`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user_token,
          },
          body: JSON.stringify(updateData),
        }
      );

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
        });
        window.location.reload();
        Router.push("/login");
      }
    }
  }
  // --------------------------------------------------Fin enregistrement----------------------------------------------------------------

  useEffect(() => {
    fetch('https://alissa-bot-zkutajntcq-ue.a.run.app/api/read-file')
      .then(response => response.json())
      .then(data => {
        setContent(data.content);
        console.log(data)
      })
      .catch(error => {
        console.error('There was an error reading the file!', error);
      });
  }, []);

  const handleEdit = () => {
    fetch('https://alissa-bot-zkutajntcq-ue.a.run.app/api/edit-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newContent }),
    })
      .then(response => response.json())
      .then(data => {
        setContent(newContent);
        setModif(data.message)
      })
      .catch(error => {
        console.error('There was an error editing the file!', error);
      });
  };

  return (
    <>
      <Head>
        <title>Entraînement du chatbot</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Entraînement du chatbot</h1>
          <nav>
            <ol className="breadcrumb">
              
              
              
            </ol>
          </nav>
        </div>
        <Link type="button" className="btn btn-secondary" href={"../"}>
          Retour
        </Link>
        <br />
        <br />
        {/* End Page Title */}
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Veillez saisir votre texte</h5>

                  <div >
                    <div className="row mb-3">
                      <div className="col-sm-12">
                        <textarea
                          className="form-control"
                          style={{ height: "100vh" }}
                          defaultValue={content}
                          rows={{ length: 100 }}
                          value={newContent}
                          ref={nom}
                          onChange={(e) => setNewContent(e.target.value)}
                          required
                          minLength={10}
                        />
                      </div>
                      
                      
                    </div>
                    

                    
                      
                      
                  

                    {/* ---------------------------------------------selection------------------------------------- */}

                    {!desactive ? (
                      <button onClick={handleEdit}  className="btn btn-primary">
                        Enregistrer
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Chargement
                      </button>
                    )}

                    <div className="row mb-3">
                       <div className="col-sm-10"> {modif}</div> 
                      
                      
                    </div>
                  </div>
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
});
