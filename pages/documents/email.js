import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useRef, useEffect, useContext } from "react"; //prendre
import withAuth from "@/components/hoc/withAuth";
import Cookies from "js-cookie";
import { DataMain } from "@/components/DataMain"; //prendre

export default withAuth(function Fautes() {
  let nom = useRef();
  let type_email = useRef();
  let destinataire = useRef();
  let lien_produit = useRef();
  let parle_produit = useRef();
  let lien_site = useRef();
  let description = useRef();

  let defaut = "Entrez le texte et cliquez sur le bouton GENERER UN EMAIL";

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
    fetch("https://alissabackendfluidbysamnk-mbrn.onrender.com/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: nom.current.value,
        type_email: type_email.current.value,
        lien_produit: lien_produit.current.value == null ? "Aucun" : lien_produit.current.value ,
        parle_produit: parle_produit.current.value,
        lien_site: lien_site.current.value == null ? "Aucun" : lien_site.current.value,
        description: description.current.value,
        destinataire: destinataire.current.value,
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
      titre: "Email pour" + destinataire.current.value,
      types: type_email.current.value,
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
        <title>Générer un Email</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Générer un Email</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">accueil</Link>
              </li>
              <li className="breadcrumb-item">Documents</li>
              <li className="breadcrumb-item">Email</li>
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
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Votre nom / entreprise:
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
                        htmlFor="cicle"
                        className="col-sm-2 col-form-label"
                      >
                        Type d&apos;email:
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          ref={type_email}
                          required
                          id="cible"
                        >
                          <option value={"Email de confirmation"}>
                            Email de confirmation
                          </option>
                          <option value={"Email de relance "}>
                            Email de relance{" "}
                          </option>
                          <option value={"Email de bienvenue "}>
                            Email de bienvenue
                          </option>
                          <option value={"Email de promotion"}>
                            Email de promotion
                          </option>

                          <option value={"Email d'invitation"}>
                            Email d&apos;invitation
                          </option>
                          <option value={"Email de rappel"}>
                            Email de rappel
                          </option>
                          <option value={"Email de suivi"}>
                            Email de suivi
                          </option>
                          <option value={"Email de plainte"}>
                            Email de plainte
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Destinataire:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={destinataire}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Parlez nous du produit:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={parle_produit}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Lien du produit: (facultatif)
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={lien_produit}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Lien de votre site: (facultatif)
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={lien_site}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Informations supplémentaire:
                      </label>

                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          style={{ height: 150 }}
                          rows={{ length: 100 }}
                          placeholder="ex: Notre produit de cosmétique pour."
                          ref={description}
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
                  <h5 className="card-title">Email Généré</h5>

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
