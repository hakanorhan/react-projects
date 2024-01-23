import axios from 'axios';

import RegisterUserRequest from '../../../../autos-backend/src/interfaces/RegisterUserRequest.js';
import RegisterResponse from '../../../../autos-backend/src/interfaces/RegisterResponse.js';

function RegisterUser() {

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    const formData : RegisterUserRequest = {
    name: "Max-User",
    familyname: "Mustermann",
    email: "max@mustermann.de",
    password1: "1234",
    password2: "1234",
    telnr: "",
    birth: "1989-10-04"
    };
    
    await axios.post<RegisterResponse>('http://localhost:3001/register',
     formData)
      .then(response => console.log(response) )
      .catch(err => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type='submit'>Submit User</button>
      </form>
    </>
  )
}

export default RegisterUser;