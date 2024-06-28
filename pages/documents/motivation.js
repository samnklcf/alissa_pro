import Head from "next/head";
import Footer from "@/components/Footer";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect, useContext } from "react"; //prendre
import withAuth from "@/components/hoc/withAuth";
import Cookies from "js-cookie";
import { DataMain } from "@/components/DataMain"; //prendre


export default withAuth(function Fautes() {
  let [copy, SetCopy] = useState(false);

  let nom = useRef();
  let age = useRef();
  let genre = useRef();
  let domicile = useRef();
  let contact = useRef();
  let adresse = useRef();
  let domaine = useRef();
  let competence = useRef();
  let poste = useRef();
  let experience = useRef();

  let entreprise = useRef();
  let responsable = useRef();
  let dom_entreprise = useRef();
  let date_creation = useRef();
  let qualite = useRef();

  let defaut = "Entrez le texte et cliquez sur le bouton GENERER UN CONTENU";

  const { user_token } = useContext(DataMain); //prendre
  const [sortie, setSortie] = useState(false);
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
    fetch(`${process.env.API_ALISSA}/api/alissa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: `
        Rédige moi une lettre de motivation avec les informations suivantes:
      Date de création de la lettre: ${date_creation.current.value}
      Mon nom: ${nom.current.value},
      genre: ${genre.current.value},
      Mon âge: ${age.current.value} ans,
      Mon domicile: ${domicile.current.value}
      Mon contact: ${contact.current.value}
      Mon adresse: ${adresse.current.value}
      Mon domaine: ${domaine.current.value}
      Poste visé: ${poste.current.value}
      Mes compétences: ${competence.current.value}
      Mon expérience: ${experience.current.value} ans
      Mes Qualités: ${qualite.current.value}
      
      Informations sur l'entreprise:
      Nom de l'entreprise: ${entreprise.current.value},
      Nom du responsable: ${responsable.current.value ? responsable.current.value : "je ne connais pas"}
      Domaine de l'entreprise: ${dom_entreprise.current.value}
      
     
        

        `,
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

  async function saved() {
    const updateData = {
      contenu: sortie,
      titre: nom.current.value,
      types: "Embauche",
      genre: "DOCUMENTS",
    };

    if (user_token) {
      let response = await fetch(
        `${process.env.BACK_DATA}/creer/2f416677-858f-796a-a221-690e5e4ae75a2f416677-858f-796a-a221-690e5e4ae75a`,
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

  const handleCopyClick = () => {
    navigator.clipboard.writeText(sortie);
    SetCopy(true);
    setTimeout(() => {
      SetCopy(false);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Lettre de motivation</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Générer une lettre de motivation</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">Motivation</li>
              <li className="breadcrumb-item">Générer une lettre de motivation</li>
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
            <div className="col-lg-5">
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
                        Votre nom complet:
                      </label>
                      <div className="col-sm-12">
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
                        className="col-sm-12 col-form-label"
                      >
                        Votre âge:
                      </label>
                      <div className="col-sm-12">
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
                        className="col-sm-12 col-form-label"
                      >
                        genre:
                      </label>
                      <div className="col-sm-12">
                      <select
                          className="form-select"
                          ref={genre}
                          required
                          id="cible"
                        >
                          <option value={"Homme"}>
                            Homme
                          </option>
                          <option value={"Femme"}>
                            Femme
                          </option>
                          
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-12 col-form-label"
                      >
                        Vos qualités:
                      </label>
                      <div className="col-sm-12">
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
                        className="col-sm-12 col-form-label"
                      >
                        Votre domicile:
                      </label>
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          ref={domicile}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-12 col-form-label">
                        Votre contact:
                      </label>
                      <div className="col-sm-12">
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
                      <label htmlFor="" className="col-sm-12 col-form-label">
                        Votre Adresse email (Facultatif):
                      </label>
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          ref={adresse}
                          placeholder="Ex: samyeyebe@gmail.com"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-12 col-form-label">
                        Domaine d&apos;étude / Diplôme(s)
                      </label>
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          ref={domaine}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-12 col-form-label"
                      >
                        Poste visé 
                      </label>
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          ref={poste}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-12 col-form-label">
                        Votre/vos compétence(e):
                      </label>
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          ref={competence}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-12 col-form-label">
                        Années d&apos;experiences:
                      </label>
                      <div className="col-sm-12">
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
                      <label htmlFor="" className="col-sm-12 col-form-label">
                        Nom de l&apos;entreprise:
                      </label>
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          ref={entreprise}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-12 col-form-label">
                        Nom du responsable et son poste (facultatif):
                      </label>
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          ref={responsable}
                          
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-12 col-form-label">
                        Domaine de l&apos;entreprise:
                      </label>
                      <div className="col-sm-12">
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
                      <label htmlFor="" className="col-sm-12 col-form-label">
                        Date de création de la lettre:
                      </label>
                      <div className="col-sm-12">
                        <input
                          type="date"
                          className="form-control"
                          ref={date_creation}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-12 col-form-label"></label>
                      <div className="col-sm-12">
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

            <div className="col-lg-7">
              <div className="card">
                <div className="card-body">
                
                  <h5 className="card-title">Idées générées</h5>

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

                        <div></div>
                      </div>
                    </div>
                  </>
                  {/* End General Form Elements */}
                
                  <br />
                  <ReactMarkdown>{sortie}</ReactMarkdown>
                  <br />
                  {copy ? (
                            <button className="btn btn-outline-success">
                              Copié !<i className="bi bi-check-all"></i>
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={handleCopyClick}
                            >
                              Copier
                              <i className="bx bxs-copy"></i>
                            </button>
                          )}
                  <>
                    {Saved &&
                      (Done ? (
                        <span className="m-1" disabled>
                          Enregistré✅
                        </span>
                      ) : (
                        <span className="btn btn-success m-1" onClick={saved}>
                          Enregistrer
                          <i className="ri-save-line m-1"></i>
                        </span>
                      ))}
                  </>
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
