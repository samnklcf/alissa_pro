import Router from 'next/router';
import React, { useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie';

export default function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    useEffect(() => {
      const token = Cookies.get('2f416677-858f-796a-a221-690e5e4ae75a-token');
      if(!token) {
        Router.push('/login')
      }
    }, []);
    return <WrappedComponent {...props} />;
  }


  
    
  
}
