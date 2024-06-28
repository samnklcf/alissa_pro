import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Footer from "@/components/Footer";
import Link from "next/link";
import { DataMain } from '@/components/DataMain'
import { useContext, useState } from "react";
import Router from "next/router";
import LocalStorage from "localstorage";
import withAuth from "@/components/hoc/withAuth";

function Marketing() {


  const mon_nom = useContext(DataMain)
  const [authent, SetAuth] = useState(true)
  const [result, setResult] = useState("")
  const [Stop, setStop] = useState(false)


  let recognition = null;
  
  function startRecognition() {
    window.webkitSpeechRecognition = window.webkitSpeechRecognition || window.webkitSpeechRecognition

    const recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'fr-FR';
  
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      console.log(result);
      setResult(result)
      // Utiliser la variable "result" pour effectuer une action avec la parole reconnue
    };
  
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
    };
  
    recognition.start();
    
    if(Stop) {
      recognition.stop()
      console.log("on a bloqué dans le if")
    }
  }
  
  function stopRecognition() {
    setStop(true)
    console.log("on a bloqué")
  }

  
    




  
  return (
    <>
      <Head>
        <title>Page d&apos;accueil</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Accueil</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"></Link>
              </li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section">
          <div className="row align-items-top">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Salutaion !</h5>
                  <div className="card-text"></div>
                  <p>
                    Bonjour, je suis <b>Alissa ia</b> 🤖. Je suis une
                    téchnologie basée sur l&apos;intelligence artificielle. Je suis
                    encore à la version 1.0.
                  </p>
                  <br />
                  <h4>Ma mission:</h4>
                  <p>
                    Je sers de <b>mentor</b> aux créateurs de contenu pour leur
                    fournir tous les outils nécessaires afin qu&apos;ils puissent
                    réussir 😊. Je crée des scripts de vidéos 📷, je fais du
                    copywriting ©️, je fais du storyteling , je traduis des
                    textes, je reformule des phrases , je rédige des lettres
                    d&apos;embauches et bien plus encore. Mon but est de faciliter la
                    production de contenus 😍, même pour ceux qui n&apos;ont pas de
                    connaissances en matière de création de contenu 😏. Avec
                    moi, devenir professionnel se fait en un clic !
                  </p>
                  <h4>Mon créateur 😎:</h4>
                  <p>
                    J&apos;ai été développée par: <b> Sam Nk Lcf 💪🏻</b>, un jeune
                    développeur fullstack gabonais . Lien de son portfolio:{" "}
                    <Link href={"https://samnklcf.netlify.app"}>ICI</Link>{" "}
                    <br />
                    Si vous avez des interrogations ou souhaitez en savoir plus
                    sur ce projet, n&apos;hésitez pas à nous contacter au:{" "}
                    <Link href="tel:+24165182611">
                      +241 65 18 26 11 (WhatsApp accepté)
                    </Link>
                    .
                  </p>

                  <h4>Mes fonctionnalités:</h4>
                  <div>
                    Je suis à la version 1.0 mais j&apos;offre déjà plusieurs outils
                    pour vous aider, notamment:
                    <ul>
                      <li>Copywritting et Storytelling</li>
                      <li>
                        création de calendriers éditoriaux à des fins précises
                      </li>
                      <li>rédaction d&apos;emails MARKETING pour les entreprises</li>
                      <li>rédaction de scripts vidéo</li>
                      <li>
                        création de contenu en fonction d&apos;un sujet ou d&apos;un lien
                      </li>
                      <li>
                        création de contenu de blog, de Tweets, Posts Instagram et bien d&apos;autre encore. 
                      </li>
                      <li>rédaction de plaintes</li>
                      <li>
                        rédaction de demande d&apos;embauche et lettre de motivation
                      </li>
                      <li>
                        correction de fautes grammaticales et d&apos;orthographe
                      </li>
                      <li>la reformulation et de la traduction de texte.</li>
                    </ul>
                  </div>
                  <h4>
                    Commencez aujourd&apos;hui à utiliser <b>gratuitement</b> mes
                    services et profitez de mon inspiration ! 🔬
                  </h4>
                  <div>
                    Vous pouvez commencer avec la partie{" "}
                    <Link href={"/marketing"}>Marketing</Link> ou{" "}
                    <Link href={"/blog"}>Blog & Post</Link> ou{" "}
                    <Link href={"/documents"}>Documents</Link> ou{" "}
                    <Link href={"/corrections"}>Correction</Link> ou{" "}
                    <Link href={"/traduction"}>Traduction</Link>
                    <br />
                    <br />
                    <h4>
                      Vous pouvez aussi touchez le menu à gauche pour naviguer
                    </h4>
                    <br />
                    <p>Numéro de téléphone: <Link href={'tel:+24165182611'}>+241 65 18 26 11</Link> </p>
                    <p>Email: <Link href={'mailto:samyeyebe@gamil.com'}>samyeyebe@gmail.com</Link> </p>
                    <p>LinkenIn: <Link href={"https://linkedin.com/in/samnklcf"}>Samuel NKENKE EYEBE</Link></p>

                    <br /><br />
                    <button onClick={startRecognition}> Entrez le texte</button><br /><br />
                    <button onClick={stopRecognition}>Stop</button>
                    <br /><br />
                    <p>{result}</p>



                  </div>
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
