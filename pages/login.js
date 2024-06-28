import React from "react";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Footer from "@/components/Footer";
import Router from "next/router";
import isAuth from "@/components/hoc/isAuth";
import Cookies from "js-cookie";
import Link from "next/link";

function Login() {
  const [erreur, SetErreur] = useState(false);
  const [top, SetTop] = useState(false);

  const username = useRef();
  const password = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", username.current.value);
    data.append("password", password.current.value);
    //console.log(data);
    SetTop(true)

    let response = await fetch(`${process.env.BACK_DATA}/api/token`, {
      method: "POST",
      body: data,
    });
    let dataUser = await response.json();

    if (response.ok) {
      Cookies.set(
        "2f416677-858f-796a-a221-690e5e4ae75a-token",
        JSON.stringify(dataUser),
        { expires: 7, path: "/" }
      );
      
      window.location.reload();
    } else {
      SetErreur(true);
      SetTop(false)
    }
  };

  return (
    <>
      <Head>
        <title>Page d&apos;de connexion</title>
      </Head>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  
                  {/* End Logo */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Se connecter 
                        </h5>
                        <p className="text-center small">
                         Entrez votre nom d&apos;utilisateur et votre mot de passe
                        </p>
                      </div>
                      <form
                        className="row g-3 needs-validation"
                        noValidate
                        onSubmit={handleForm}
                      >
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">
                            Nom d&apos;utilisateur
                          </label>
                          <div className="input-group has-validation">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend"
                            >
                              <i className="bx bxs-user-circle"></i>
                            </span>
                            <input
                              type="text"
                              name="username"
                              className="form-control"
                              id="yourUsername"
                              required
                              ref={username}
                            />
                            <div className="invalid-feedback">
                              Veillez entrer un nom d&apos;utilisateur.
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">
                            Mot de passe
                          </label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="yourPassword"
                            required
                            ref={password}
                          />
                          <div className="invalid-feedback">
                            Veillez enter un mot de passe!
                          </div>
                          <br />
                          {erreur && (
                            <div className="clo">
                              Mot de passe ou nom d&apos;utilisateur incorrect!
                            </div>
                          )}
                        </div>
                        
                        <div className="col-12">
                          {top ? (
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
                          ): (
                            <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Se connecter
                          </button>
                          )}
                        </div>
                        <center className="col-12">
                          <p className="small mb-0">
                            Voulez-vous créer un compte?<br />
                            <Link href="/creation">Créer un compte</Link>
                          </p>
                        </center>
                      </form>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default isAuth(Login);
