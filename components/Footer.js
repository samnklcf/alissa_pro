import React from "react";
import Script from "next/script";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <footer id="footer" className="footer">
        <div className="copyright">
          © Copyright{" "}
          <strong>
            <span></span>
          </strong>
          . Tous droits réservés par
        </div>
        <div className="credits">
           <Link href="https://samnklcf.netlify.app"><b>ALISSA IA <sub>Version 2</sub></b></Link>
        </div>
      </footer>
      

      <Script src="../assets/vendor/apexcharts/apexcharts.min.js"></Script>
      <Script src="../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>
      <Script src="../assets/vendor/chart.js/chart.umd.js"></Script>
      <Script src="../assets/vendor/echarts/echarts.min.js"></Script>
      <Script src="../assets/vendor/quill/quill.min.js"></Script>
      <Script src="../assets/vendor/simple-datatables/simple-datatables.js"></Script>
      
      

      <Script src="../assets/js/main.js"></Script>
    </div>
  );
}
