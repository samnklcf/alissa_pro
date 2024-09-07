import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/button";
import { useState, useRef, useEffect, useContext } from "react"; //prendre
import withAuth from "@/components/hoc/withAuth";
import Cookies from "js-cookie";
import { DataMain } from "@/components/DataMain"; //prendre
import { set } from "react-hook-form";
import ReactMarkdown from "react-markdown";

function Fautes() {
  let lien = useRef();
  let type = useRef();

  let defaut = "Entrez le texte et cliquez sur le bouton GENERER UN CONTENU";

  const { user_name, user_token, user_refresh_token } = useContext(DataMain); //prendre
  const [sortie, setSortie] = useState(defaut);
  const [loader, setLoader] = useState(false);
  const [desactive, setDesactive] = useState(false);
  const [Saved, SetSaved] = useState(false);
  const [Done, SetDone] = useState(false);
  const [generer, setGenerer] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    let contenu = generer == "Lien non pris en charge" ? "" : generer;

    setLoader(true);
    setDesactive(true);
    setSortie("");
    SetSaved(false);
    SetDone(false);
    // setLoader(true)

    fetch("https://alissabackfluid-dot-alissa-ia.uc.r.appspot.com/api/alissa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: `
        fait l'analyse de chaque commentaire important de ce post en francais, donne les erreurs de ce poste pour la visibilité, donne aussi des conseil pour les prochains post pour avoir plus de visibilité. Apporte aussi des correction à certaine partie du post comme illustration:
        ${lien.current.value}

        tu suis cette structure: 
        1.Clarté et concision
        2.Pertinence du contenu
        3.Engagement et interactivité
        4.Commentaires
        5.Authenticité et originalité
        6.Structuration et formatage
        7.Timing et fréquence
        8.Interactions précédentes
        9.Langage et ton
        `,
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
      titre: type.current.value,
      types: `${type.current.value}`,
      genre: "DOCUMENTS",
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

  async function SendLien() {
    if (lien.current.value === isNaN) {
      setGenerer("Veillez entrez un lien");
    } else {
      setBtnLoader(true);
      let response = await fetch(
        "https://alissabackendfluidbysamnk-mbrn.onrender.com/api/scrap",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lien: lien.current.value,
          }),
        }
      );
      let data = await response.json();
      if (response.ok) {
        setGenerer(` ${data.slice(0, 3000)} `);
        setBtnLoader(false);
      } else {
        setGenerer(data);
        setBtnLoader(false);
      }
    }
  }

  function supp() {
    setTimeout(() => {
      setGenerer("");
    }, 500);
  }

  return (
    <>
      <Head>
        <title>Trouver un Contenu</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Générer un Contenu</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Accueil</Link>
              </li>
              <li className="breadcrumb-item">Blog</li>
              <li className="breadcrumb-item">Générer un Contenu</li>
            </ol>
          </nav>
        </div>
        <Link type="button" className="btn btn-secondary" href={"/"}>
          Retour
        </Link>
        <br />
        <br />
        <b className="epz">Maximum 2 minutes pour une génération</b>
        <br />
        <br />

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Veillez saisir les informations
                  </h5>

                  <form onSubmit={handleForm}>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-12 col-form-label"
                      >
                        Plateforme:
                      </label>
                      <div className="col-sm-12">
                        <select
                          className="form-select"
                          ref={type}
                          required
                          id="cible"
                        >
                          <option value={"LinkedIn"}>LinkedIn</option>
                          <option value={"Facebook"}>Facebook</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Ajouter un lien: (Facultatif)
                      </label>
                      <div className="col-sm-10">
                        🚨
                        <b className="lo rouge">
                          Uniquement les liens de blogs publics qui autorisent
                          la réutilisation de contenu !
                        </b>
                        <input
                          type="lien"
                          className="form-control"
                          ref={lien}
                          placeholder="Ex: https://samnklcf.app"
                        />
                        <br />
                        {btnLoader ? (
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="visually-hidden">
                              Chargement...
                            </span>
                          </div>
                        ) : (
                          <span className="btn btn-primary" onClick={SendLien}>
                            {" "}
                            Charger le contenu du lien
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Texte généré par le lien(Facultatif):
                      </label>
                      <pre className="col-sm-10 h-50 border-1 lo mat">
                        {generer ? (
                          <>
                            Aperçu du contenu du lien: <br />
                            <br />
                            {`${generer.slice(0, 1000)}...`}
                            <br /> <br />
                            <span
                              className="btn btn-warning lo "
                              onClick={supp}
                            >
                              Annuler
                            </span>
                          </>
                        ) : (
                          "Aucun lien"
                        )}
                      </pre>
                    </div>

                    {/* ---------------------------ton--------------------- */}

                    {/* --------------------Cibles----------------- */}

                    {/* -------------------------suite --------------------------- */}

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label"></label>
                      <div className="col-sm-10">
                        {!desactive ? (
                          <button type="submit" className="btn btn-primary">
                            Générer
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
                      </div>
                    </div>
                  </form>
                  {/* End General Form Elements */}
                </div>
              </div>
            </div>
            <div className="col-lg-12" id="corriger">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Post Généré</h5>

                  <>
                    <div className="row mb-3">
                      <div className="col-sm-12">
                        {loader ? (
                          <div className="sam">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Chargement...
                              </span>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        <ReactMarkdown>{sortie}</ReactMarkdown>
                        <>
                          {Saved &&
                            (Done ? (
                              <span className="m-1" disabled>
                                Enregistré✅
                              </span>
                            ) : (
                              <span
                                className="btn btn-success m-1"
                                onClick={saved}
                              >
                                Enregistrer
                                <i className="ri-save-line m-1"></i>
                              </span>
                            ))}
                        </>
                      </div>
                    </div>
                  </>
                  {/* End General Form Elements */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default withAuth(Fautes);
