import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IResponseSignInData } from '../../../../autos-backend/src/interfaces/signin/IResponseSignInData';
import { useLocation } from 'react-router-dom';



export default function InserateCar() {

  //const [name, setName] = useState("");
  
  const location = useLocation();
  const { id, name, role } = location.state;
  

  async function getData() {
    await axios.get<IResponseSignInData>('http://localhost:3001/inseratecar', { withCredentials: true })
        .then(function(response) { 
          const data: IResponseSignInData = response.data;
          alert("Guten Tag," + name);
          //setName(response.data.name)
        })
        .catch(function(err) {
          //setName(err)
        })
  }

  getData();

  return (
    <div style={{ height: '400px' }}>{ name }</div>
  )
}
