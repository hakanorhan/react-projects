import axios from 'axios';

import RegisterAdminRequest from '../../../../autos-backend/src/interfaces/RegisterAdminRequest.js';
import RegisterResponse from '../../../../autos-backend/src/interfaces/RegisterResponse.js';
import RegisterPersonInfo from '../../../../autos-backend/src/interfaces/RegisterPersonInfo.js';
import Address from '../../../../autos-backend/src/interfaces/Address.js';

function RegisterAdmin() {

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    const address: Address = {
      streetnr: "Beispielstr. 22",
      zipcode: "45886",
      city: "Gelsenkirchen",
      blandid: 3
    }

    const registerPerson : RegisterPersonInfo = {
      name: "Hakan",
      familyname: "Orhan",
      email: "hakan@test-email.de",
      password1: "hallo1234",
      password2: "hallo1234",
      telnr: "0152777xx",
      birth: "04-10-1989",
      isactive: true, 
      address
    };

    // All needed informations for register
    const formData : RegisterAdminRequest = {
      personinfo: registerPerson
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