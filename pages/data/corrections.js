import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Footer from "@/components/Footer";
import Link from "next/link";
import { DataMain } from "@/components/DataMain";
import { useContext, useEffect, useState, useCallback } from "react";
import Router from "next/router";
import LocalStorage from "localstorage";
import withAuth from "@/components/hoc/withAuth";
import Cookies from "js-cookie";

function Marketing() {
  const [data, SetData] = useState();
  const [donne, SetDonne] = useState();
  const { user_name, user_token, user_refresh_token } = useContext(DataMain);
  // console.log(user_token)

  const getData = useCallback(async () => {
    if (user_token) {
      let response = await fetch("https://alissadata.pythonanywhere.com/data/corrections", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user_token,
        },
      });
      let donne = await response.json();
      if (response.ok) {
        SetData(donne);
      } else {
        Cookies.remove("2f416677-858f-796a-a221-690e5e4ae75a-token", {
          path: "/",
        });
        window.location.reload();
        Router.push("/login");
      }
    }
  }, [user_token]);

  useEffect(() => {
    getData();
  }, [getData]);

  

  // _________________________________evenement pour voir les données-----------------------
  let voir = async (id) => {
    if (user_token) {
      let response = await fetch(`https://alissadata.pythonanywhere.com/data/marketing/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user_token,
        },
        
      });
      let donne = await response.json();
      if (response.ok) {
        SetDonne(donne);
        // console.log(donne);
      } else {
        Cookies.remove("2f416677-858f-796a-a221-690e5e4ae75a-token", {
          path: "/",
        });
        window.location.reload();
        Router.push("/login");
      }
    }
  };

  // console.log(user_token);
  let titre = donne && (donne.titre).slice(0, 100);
  let content = donne && donne.contenu;
  let date = donne && donne.datetime;
  let types = donne && donne.types;

  const dateString = date;
  const datetime = new Date(dateString);
  const dateStr = datetime.toLocaleDateString();

  function revenir() {
    Router.push("/");

    setTimeout(() => {
      Router.push("/data/corrections");
    }, 1000);
  }

  let [copy, SetCopy] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(content);
    SetCopy(true);
    setTimeout(()=> {
      SetCopy(false);
    }, 2000)
  };

 
  function suppe() {
   
    setTimeout(() => {
      SetDonne("")
    }, 1000);
  }
 


  return (
    <>
      <Head>
        <title>Page de Achive corrections</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard/Corrections</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/">Corrections</Link>
              </li>
            </ol>
          </nav>
        </div>
        <Link type="button" className="btn btn-secondary m-1" href={"/"}>
          Retour
        </Link>
        <Link type="button" className="btn btn-outline-primary" href={"/corrections"}>
          Créer <b>+</b>
        </Link>
        <br />
        <br />
        {/* End Page Title */}

        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-12">
                  <div className="card top-selling overflow-auto">
                    <div className="card-body pb-0">
                      <h5 className="card-title">Votre historique <br /> <sub>(20 derniers enregistrements)</sub></h5>
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col">Titre</th>
                            <th scope="col">Type</th>
                            <th scope="col">Date</th>
                            <th scope="col">Voir</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data ? (
                            
                            data
                              .map((item) => {
                                const dateString = item.datetime;
                                const date = new Date(dateString);
                                const formattedDate = date.toLocaleDateString();
                                return (
                                  <tr key={item.id}>
                                    <th scope="row">{item.titre.slice(0,60)}...</th>
                                    <th scope="row">{item.types}</th>

                                    <td>{formattedDate}</td>
                                    <td className="fw-bold">
                                      <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalDialogScrollable"
                                        onClick={() => voir(item.id)}
                                      >
                                        Voir
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                          ) : (
                            <tr>
                              <th scope="row">
                              <br />
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
                                <br />
                                <br />
                              </th>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-bo">
                  <div
                    className="modal fade"
                    id="modalDialogScrollable"
                    tabIndex={-1}
                  >
                    <div className="modal-dialog modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-header">
                          <span className="modal-title">
                            Texte d&apos;entrée: <b>{titre} ...</b> <br /> <i className="minil">Type: {types} </i> <br /> <i className="minil">du {dateStr}</i>
                          </span>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <pre
                          className="modal-body"
                          dangerouslySetInnerHTML={{ __html: content }}
                        ></pre>
                        <div className="modal-footer">
                          {copy ? (
                            <button className="btn btn-outline-success">
                              Copié !
                              <i className="bi bi-check-all"></i>
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

                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={suppe}
                          >
                            Fermer
                          </button>
                          {/* <button type="button" className="btn btn-primary">
                            Save changes
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Modal Dialog Scrollable*/}
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

export default withAuth(Marketing);
