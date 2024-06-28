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
  let date_jour = useRef();
  let nom = useRef();
  let date_naissance = useRef();
  let lieu_naissance = useRef();
  let profession = useRef();
  let contact = useRef();
  let adresse = useRef();
  let destinataire = useRef();
  let accused = useRef();
  let description = useRef();
  let preuve = useRef();
  let temoin = useRef();
  let date_fait = useRef();

  let defaut = "Entrez le texte et cliquez sur le bouton GENERER UNE PLAINTE";

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
    fetch("https://alissabackendfluidbysamnk-mbrn.onrender.com/api/plainte", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date_jour: date_jour.current.value,
        nom: nom.current.value,
        date_naissance: date_naissance.current.value,
        lieu_naissance: lieu_naissance.current.value,
        profession: profession.current.value,
        contact: contact.current.value,
        adresse: adresse.current.value,
        destinataire: destinataire.current.value,
        date_fait: date_fait.current.value,
        temoin: temoin.current.value,
        accused: accused.current.value,
        description: description.current.value,
        preuve: preuve.current.value,
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
      types: "Plainte contre " + accused.current.value,
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
        <title>Générer une plainte</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Générer une plainte</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">accueil</Link>
              </li>
              <li className="breadcrumb-item">Documents</li>
              <li className="breadcrumb-item">Plainte</li>
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
                        Date de création:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="Date"
                          className="form-control"
                          ref={date_jour}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
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
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Date de naissance:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="date"
                          className="form-control"
                          ref={date_naissance}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Lieu naissance:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={lieu_naissance}
                          required
                          placeholder="Ex: Franceville"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Ma profession:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={profession}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Votre quartier:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={adresse}
                          required
                          placeholder="Libreville / Mindoubé chez le chef"
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
                        Date des faits:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="date"
                          className="form-control"
                          ref={date_fait}
                          required
                        />
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
                          required
                          placeholder="Le commissaire du 5ème arrondissement"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Plainte contre:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={accused}
                          required
                          placeholder="Ecrivez X si vous n'avez pas son identité"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Description:
                      </label>

                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          style={{ height: 150 }}
                          rows={{ length: 100 }}
                          placeholder="ex: le 16/12/2022 Monsieur Wilfrid est venu violé mes 3 voitures qui étaient dans le garage. Il a cassé mes vitres, a tué mes deux chiens et a pris les voitures. J'ai deux personne qui peuvent témoigner"
                          ref={description}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Avez-vous des témoins?:
                      </label>

                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          style={{ height: 150 }}
                          rows={{ length: 100 }}
                          placeholder="Ex: Ecrivez AUCUN si vous n'en avez pas."
                          ref={temoin}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Les Preuves:
                      </label>

                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          style={{ height: 150 }}
                          rows={{ length: 100 }}
                          placeholder="ex: Les vitres de mon garage sont cassées, mes deux chiens sont morts, ma fille est traumatisée..."
                          ref={preuve}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label"></label>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                          {!desactive ? (
                            <button type="submit" className="btn btn-primary">
                              Générer une plainte
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
                    </div>
                  </form>
                  {/* End General Form Elements */}
                </div>
              </div>
            </div>
            <div className="col-lg-12" id="corriger">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Plainte Générée</h5>

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
