import { Html, Head, Main, NextScript } from "next/document";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta name="a.validate.02" content="HOOZNTXdATnkLhyvWUIx5oJiyG8VxKo-dCzY" />

        <meta content="" name="description" />
        <meta content="" name="keywords" />
        {/* Favicons */}
        <link href="../assets/img/favicon.png" rel="icon" />
        <link href="../assets/img/favicon.png.png" rel="apple-touch-icon" />

        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="trueq" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap"
          rel="stylesheet"
        />
        {/* Vendor CSS Files */}
        <link
          href="../assets/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="../assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />

        <link
          href="../assets/vendor/boxicons/css/boxicons.min.css"
          rel="stylesheet"
        />

        {/* Template Main CSS File */}

        <link href="../assets/css/style.css" rel="stylesheet" />
        <script src="../assets/js/hotjar.js" defer></script>
        {/* <script src="https://alissa-bot.onrender.com/alissabot_nk.js" defer></script> */}
        
      </Head>
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
