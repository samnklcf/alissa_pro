import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useForm } from "react-hook-form";
import handler from "./hello";
import { useState, useRef, useEffect } from "react";
import withAuth from "@/components/hoc/withAuth";


function Titres() {
  let ton = useRef();
  let cible = useRef();
  let lien = useRef();

  const [ip, setIp] = useState("");

  useEffect(() => {
    fetch("https://ipinfo.io/json?token=bcb7f2573a3e35")
      .then((response) => response.json())
      .then((jsonResponse) => {
        setIp(jsonResponse);
      });
  }, []);

  let defaut =
    "Entrez le texte et cliquez sur le bouton GENERER UNE INSPIRATION";

  const [sortie, setSortie] = useState(defaut);
  const [loader, setLoader] = useState(false);
  const [desactive, setDesactive] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();

    setLoader(true);
    setDesactive(true);
    setSortie("");
    // setLoader(true)

    const updateData = new FormData();
    updateData.append("ton", `${ton.current.value}`);
    updateData.append("lien", `${lien.current.value}`);
    updateData.append("cible", `${cible.current.value}`);

    console.log(updateData);
    fetch("https://alissa-ia.onrender.com/api/inspiration", {
      method: "POST",
      body: updateData,
    })
      .then(async (data) => {
        return data.json();
      })
      .then(async (responses) => {
        console.log(responses);

        setSortie(responses);
        setDesactive(false);
        setLoader(false);
        //   setLoader(false)
      })
      .catch((err) => {
        setSortie(`<b style="color: red;">Il y a un problème de connexion😣 📶<i>veuillez réessayer</i></b> .\nVeuillez noter que c'est la première version du programme et qu'il peut y avoir des erreurs mineures. Veuillez appuyer sur le bouton de génération
        
        `)
        setLoader(false);
        setDesactive(false);
      });

      setTimeout(() => {
        const sam = new FormData();
        sam.append("nom", `Service: inspiration ; Pays:${ip.country}, Ville: ${ip.city}, region: ${ip.region}, timezone: ${ip.timezone}`);
  
        fetch("https://alissa-ia.onrender.com/api/utilisateur", {
          method: "POST",
          body: sam,
        })
          .then(async (data) => {
            return data.json();
          })
          .then(async (responses) => {
            console.log(responses);
  
            //   setLoader(false)
          });
      }, 5000);
  };

  return (
    <>
      <Head>
        <title>Lien vers contenu</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Trouver un contenu</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Acceuil</Link>
              </li>
              <li className="breadcrumb-item">Blog</li>
              <li className="breadcrumb-item">Trouveer un contenu</li>
            </ol>
          </nav>
        </div>
        <Link type="button" className="btn btn-secondary" href={"/blog"}>
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
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Lien*
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="url"
                          className="form-control"
                          ref={lien}
                          required
                          placeholder="Ex: https://nk-lcf.com"
                        />
                      </div>
                    </div>

                    {/* ---------------------------Contenu--------------------- */}

                    <div className="row mb-3">
                      <label htmlFor="sel" className="col-sm-2 col-form-label">
                        Ton:
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          ref={ton}
                          required
                          id="sel"
                        >
                          <option value={"aléatoire"}>Aléatoire</option>
                          <option value={"inspirant"}>Inspirant</option>
                          <option value={"sérieuse"}>Sérieux</option>
                          <option value={"humoristique"}>Humoristique</option>
                          <option value={"dramatique"}>Dramatique</option>
                          <option value={"poétique:"}>Poétique:</option>
                          <option value={"informatif"}>Informatif</option>
                        </select>
                      </div>
                    </div>

                    {/* --------------------Cibles----------------- */}

                    <div className="row mb-3">
                      <label
                        htmlFor="cicle"
                        className="col-sm-2 col-form-label"
                      >
                        Cible:
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          ref={cible}
                          required
                          id="cible"
                        >
                          <option value={"Enfants"}>Enfants</option>
                          <option value={"Jeunes"}>Jeunes</option>
                          <option value={"Personnes agées"}>
                            Personnes agées
                          </option>
                          <option value={"Tout le monde"}>Tout le monde</option>
                        </select>
                      </div>
                    </div>

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

                        <pre id="samnk" dangerouslySetInnerHTML={{__html: sortie}}></pre>
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


export default withAuth(Titres)