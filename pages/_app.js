import "@/styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Erreur from "@/components/Erreur";
import Data from "@/components/hoc/withAuth";
import { DataMain } from "@/components/DataMain";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showAside = router.pathname !== "/accueil";

  const [username, SetData] = useState();
  const [token, SetToken] = useState();
  const [refreshToken, SetRefreshToken] = useState();
  const [cook, SetCook] = useState();

  useEffect(() => {
    let sam = Cookies.get("2f416677-858f-796a-a221-690e5e4ae75a-token")
      ? JSON.parse(Cookies.get("2f416677-858f-796a-a221-690e5e4ae75a-token"))
      : undefined;
    if (sam !== undefined) {
      SetData(jwtDecode(sam.access).username);
      SetToken(sam.access);
      SetRefreshToken(sam.refresh);
    }
  }, [token]);

  useEffect(() => {
    let sam = Cookies.get("2f416677-858f-796a-a221-690e5e4ae75a-Cooktoken")
      ? JSON.parse(
          Cookies.get("2f416677-858f-796a-a221-690e5e4ae75a-Cooktoken")
        )
      : undefined;
    if (sam !== undefined) {
      SetCook(sam.nom);
    }
  }, [cook]);

  const DataObject = {
    user_name: username,
    user_token: token,
    user_refresh_token: refreshToken,
    cook: cook,
  };

  return (
    <>
      <NextNProgress color="#0057fc" />

      <DataMain.Provider value={DataObject}>
        <Component {...pageProps} />
        <Header />
        <Aside />
      </DataMain.Provider>
    </>
  );
}
