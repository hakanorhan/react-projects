import axios from 'axios';

import RegisterUserRequest from '../../../../autos-backend/src/interfaces/RegisterUserRequest.js';
import RegisterResponse from '../../../../autos-backend/src/interfaces/RegisterResponse.js';
import RegisterPersonInfo from '../../../../autos-backend/src/interfaces/RegisterPersonInfo.js';
import Address from '../../../../autos-backend/src/interfaces/Address.js';

function RegisterUser() {

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    // Address from user
    const address: Address = {
      streetnr: "Beispielstr. 22",
      zipcode: "45886",
      city: "Gelsenkirchen",
      blandid: 2
    }
    
    const personRegister: RegisterPersonInfo = {
    name: "Max-User",
    familyname: "Mustermann",
    email: "max@mustermann.de",
    password1: "1234",
    password2: "1234",
    telnr: "",
    birth: "1989-10-04",
    isactive: true,
    address: address
    };
    
    // send user data
    const formData : RegisterUserRequest = {
      personinfo: personRegister,
      isCardealer: false
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