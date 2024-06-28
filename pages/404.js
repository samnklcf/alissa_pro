import React, { useContext, useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { DataMain } from '@/components/DataMain'


export default function NotFound() {
  
 
  return (
    <div>
    <main>
      <br /><br /><br />
        <center ClassName="container">
          <section ClassName="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <br /><br /><br /><br /><br />
            <h1><span className='bleu'>404</span> ⚓</h1><br />
            <p>La page que vous voulez consulter ne fonctionne plus

            </p>
           
        
            
            <Link ClassName="btn" href="/">
              Revenir à l&apos;accueil
            </Link>
            
           
          </section>
        </center>

      </main>
      <br /><br />

   
    </div>

  )
}
