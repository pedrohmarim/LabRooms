import React, { useEffect } from 'react';
import api from './services/backAPI';

export default function App(){

  useEffect(()=>{
    api.post('/test', {
      headers:{
        DTO:{
          nome: 'Pedro',
          sobrenome: 'Marim'
        }
      }
    }).then(res=>{
      const { data } = res;
      console.log(data);
    })
  },[])

  return (
    <h1>App</h1>
  )
}