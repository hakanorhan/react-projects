import React, { useEffect, useState } from 'react';
import axios from 'axios';



export default function InserateCar() {

  const [name, setName] = useState("");

  async function getData() {
    await axios.get<any>('http://localhost:3001/inseratecar', { withCredentials: true })
        .then(function(response) { 
          setName(response.data.name)
        })
        .catch(function(err) {
          setName(err)
        })
  }

  useEffect(() => {
      getData();

  }, [])

  return (
    <div style={{ height: '400px' }}>{ name }</div>
  )
}
