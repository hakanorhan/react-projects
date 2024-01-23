import axios from 'axios';

import RegisterAdminRequest from '../../../../autos-backend/src/interfaces/RegisterAdminRequest.js';
import RegisterResponse from '../../../../autos-backend/src/interfaces/RegisterResponse.js';

function RegisterAdmin() {

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    const formData : RegisterAdminRequest = {
    persnr:"HO1",
    name: "Max",
    familyname: "Mustermann",
    email: "max@mustermann.de",
    password1: "1234",
    password2: "1234",
    grantpubliccar: true,
    grantcreateadmin: true,
    grantall: true,
    createdbyadminid: 0 

    };
    
    await axios.post<RegisterResponse>('http://localhost:3001/dashboard-register',
     formData)
      .then(response => console.log(response) )
      .catch(err => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type='submit'>Submit Admin</button>
      </form>
    </>
  )
}

export default RegisterAdmin;