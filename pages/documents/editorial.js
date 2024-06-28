import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect, useContext } from "react"; //prendre
import withAuth from "@/components/hoc/withAuth";
import Cookies from "js-cookie";
import { DataMain } from "@/components/DataMain";
import ReactMarkdown from "react-markdown";

export default withAuth(function Fautes() {
  let sujet = useRef();
  let cible = useRef();
  let objectif = useRef();
  let explication = useRef();
  let frequence = useRef();
  let date_debut = useRef();
  let genre = useRef();
  let dure = useRef();

  let defaut = "Entrez le texte et cliquez sur le bouton GENERER UN CALENDRIER";

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
    setSortie("");
    SetSaved(false);
    SetDone(false); //prendre
    // setLoader(true)

    //console.log(updateData);
    fetch("https://alissabackfluid.onrender.com/api/alissa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: `
        Crée un calendrier éditorial pertinent avec ces informations. Sous forme de tableau:
        sujet: ${sujet.current.value},
        cible: ${cible.current.value},
        objectif: ${objectif.current.value},
        explication: ${explication.current.value},

        frequence: ${frequence.current.value},
        date_debut: ${date_debut.current.value},
        genre: ${genre.current.value},
        dure: ${dure.current.value},
        
        Affiche ça de cette manière:

      
      <table>
        <thead>
            <tr>
                <th>Thème</th>
                <th>Date</th>
                <th>Titre</th>
                <th>Texte explicatif</th>
                <th>Type de contenu</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td></td>
            </tr>
        </tbody>
    </table>
    


        `
      }),
    })
      .then(async (data) => {
        return data.json();
      })
      .then(async (responses) => {
        //console.log(responses);

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
      titre: sujet.current.value,
      types: "Calendrier",
      genre: "MARKETING",
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
        //console.log(donne);
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
        //console.log(response);
      }
    }
  }
  // --------------------------------------------------Fin enregistrement----------------------------------------------------------------

  return (
    <>
      <Head>
        <title>Générer un calendrier Editorial</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Calendrier Editorial</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Accueil</Link>
              </li>
              <li className="breadcrumb-item">Marketing</li>
              <li className="breadcrumb-item">Calendrier Editorial</li>
            </ol>
          </nav>
        </div>
        <Link type="button" className="btn btn-secondary" href={"/"}>
          Retour
        </Link>
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
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Le sujet:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={sujet}
                          placeholder="Ex: Comment devenir développeur fullstack en 2023?"
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Explication du sujet: (Facultatif)
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          type="text"
                          className="form-control"
                          ref={explication}
                          placeholder=""
                          rows={4}
                          minLength={7}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="sel" className="col-sm-2 col-form-label">
                        Cible:
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          ref={cible}
                          required
                          id="sel"
                        >
                          <option value={"Toutes les cibles"}>
                            Toutes les cibles
                          </option>
                          <option value={"Proféssionnel"}>Proféssionnel</option>
                          <option value={"Personnes sans emploi"}>
                            Personnes sans emploi
                          </option>
                          <option value={"Entrepreneur"}>Entrepreneur</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="sel" className="col-sm-2 col-form-label">
                        Genre de la Cible:
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          ref={genre}
                          required
                          id="sel"
                        >
                          <option value={"Tout le monde"}>Tout le monde</option>
                          <option value={"homme"}>Homme</option>
                          <option value={"femme"}>Femme</option>
                          <option value={"Entreprises"}>Entreprises</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Objectifs: (Facultatif)
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          type="text"
                          className="form-control"
                          ref={objectif}
                          placeholder="Ex: Gagner en Notoriété ..."
                          rows={4}
                          minLength={7}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Date de début:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="date"
                          className="form-control"
                          ref={date_debut}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Date de Fin:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="date"
                          className="form-control"
                          ref={dure}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Nombre de publications:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="number"
                          className="form-control"
                          ref={frequence}
                          required
                          min={1}
                          max={10}
                        />
                      </div>
                    </div>

                    

                    

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label"></label>
                      <div className="col-sm-10">
                        {!desactive ? (
                          <>
                            <button type="submit" className="btn btn-primary">
                              Générer
                            </button>
                          </>
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
                  <h5 className="card-title">Calendrier Généré</h5>

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

<pre
                          id="samnk"
                          dangerouslySetInnerHTML={{ __html: sortie }}
                        ></pre>
                        
                        {/* <ReactMarkdown>{sortie}</ReactMarkdown> */}
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
});