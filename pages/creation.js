import React from "react";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Footer from "@/components/Footer";
import Router from "next/router";
import isAuth from "@/components/hoc/isAuth";
import Cookies from "js-cookie";
import Link from "next/link";

function Login() {
  const [erreur, SetErreur] = useState();
  const [top, SetTop] = useState(false);

  const username = useRef();
  const email = useRef();
  const password = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", username.current.value);
    data.append("email", email.current.value);
    data.append("password", password.current.value);
    //console.log(data);
    SetTop(true);

    let response = await fetch(
      `${process.env.BACK_DATA}/creation-2f416677-858f-796a-a221-690e5e4ae75a2f416677-858f-796a-a221-690e5e4ae75a`,
      {
        method: "POST",
        body: data,
      }
    );
    let dataUser = await response.json();

    if (response.ok) {
      Cookies.set(
        "2f416677-858f-796a-a221-690e5e4ae75a-token",
        JSON.stringify(dataUser),
        { expires: 7, path: "/" }
      );

      Cookies.set(
        "2f416677-858f-796a-a221-690e5e4ae75a-Cooktoken",
        JSON.stringify({ nom: username.current.value }),
        { expires: 7, path: "/" }
      );

      window.location.reload();
    } else {
      SetErreur(dataUser);
      SetTop(false);
    }
  };

  return (
    <>
      <Head>
        <title>Page de création de compte</title>
      </Head>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <br />
                  <br />
                  <br />

                  {/* End Logo */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          creation de compte
                        </h5>
                        <p className="text-center small">
                          Entrez vos informations
                        </p>
                      </div>
                      <form
                        className="row g-3 needs-validation"
                        noValidate
                        onSubmit={handleForm}
                      >
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">
                            Nom d&apos;utilisateur *
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
                              placeholder="Ex: samnklcf"
                            />
                            <div className="invalid-feedback">
                              Veillez entrer votre utilisateur.
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">
                            Votre email
                          </label>
                          <div className="input-group has-validation">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend"
                            >
                              @
                            </span>
                            <input
                              type="email"
                              name="username"
                              className="form-control"
                              id="yourUsername"
                              required
                              ref={email}
                              placeholder="Ex: samyeyebe@gmail.com"
                            />
                            <div className="invalid-feedback">
                              Veillez entrer votre email. <br />
                              Ex: samnk@gmail.com
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
                            minLength={8}
                          />
                          <div className="invalid-feedback">
                            Veillez enter un mot de passe! Min 8 caractères
                          </div>

                          <div className="clo">
                            {erreur && (
                              <>
                                <br /> {erreur.username}
                              </>
                            )}{" "}
                            <br />
                            {erreur && erreur.email}
                          </div>
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
                          ) : (
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              Créer un compte
                            </button>
                          )}
                        </div>
                        <div className="col-12">
                          <center className="small mb-0">
                            Avez vous déjà un compte? <br />
                            <Link href="/login">Se connecter</Link>
                          </center>
                        </div>
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
