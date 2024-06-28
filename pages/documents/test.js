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
  let age = useRef();
  let domicile = useRef();
  let contact = useRef();
  let adresse = useRef();
  let domaine = useRef();
  let competence = useRef();
  let experience = useRef();

  let entreprise = useRef();
  let dom_entreprise = useRef();
  let date_creation = useRef();
  let qualite = useRef();

  let defaut = "Entrez le texte et cliquez sur le bouton GENERER UNE LETTRE";

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
    SetDone(false);
    // setLoader(true)

    //console.log(updateData);
    fetch("https://alissabackendfluidbysamnk-mbrn.onrender.com/api/embauche", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: nom.current.value,
        domicile: domicile.current.value,
        age: age.current.value,
        contact: contact.current.value,
        domaine: domaine.current.value,
        competence: competence.current.value,
        experience: experience.current.value,
        adresse: adresse.current.value,
        entreprise: entreprise.current.value,
        dom_entreprise: dom_entreprise.current.value,
        date_creation: date_creation.current.value,
        qualite: qualite.current.value,
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
      titre: nom.current.value,
      types: "Embauche",
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
        <title>Générer demande d&apos;embauche</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Générer demande d&apos;embauche</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">accueil</Link>
              </li>
              <li className="breadcrumb-item">Documents</li>
              <li className="breadcrumb-item">embauche</li>
            </ol>
          </nav>
        </div>
        <Link type="button" className="btn btn-secondary" href={"/documents"}>
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
                        Votre nom complet:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={nom}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Votre âge:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="number"
                          className="form-control"
                          ref={age}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Vos qualités:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={qualite}
                          placeholder="Je suis intélligent, j'aime l'action"
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Votre domicile:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={domicile}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Votre contact:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="tel"
                          className="form-control"
                          ref={contact}
                          placeholder="+24174570040"
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Votre Adresse email (Facultatif):
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={adresse}
                          placeholder="Ex: samyeyebe@gmail.com"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Domaine d&apos;étude:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={domaine}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Votre/vos compétence(e):
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={competence}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Années d&apos;experiences:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="number"
                          className="form-control"
                          min={1}
                          ref={experience}
                          placeholder="Ne mettez rien si vous n'en avez pas."
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Nom de l&apos;entreprise:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={entreprise}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Domaine de l&apos;entreprise:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={dom_entreprise}
                          placeholder="Informatique, incubateur etc..."
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Date de création de la lettre:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="date"
                          className="form-control"
                          ref={date_creation}
                          required
                        />
                      </div>
                    </div>

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
                  <h5 className="card-title">Lettre Générée</h5>

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
                          className="nk"
                          dangerouslySetInnerHTML={{ __html: sortie }}
                        ></pre>
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
