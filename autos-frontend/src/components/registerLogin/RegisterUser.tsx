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
      streetnr: "Neue Beispielstr. 33",
      zipcode: "45886",
      city: "Essen",
      blandid: 10
    }
    
    
    const personRegister: RegisterPersonInfo = {
    name: "Thomas",
    familyname: "Müller",
    email: "mueller@email.de",
    password1: "1234",
    password2: "1234",
    telnr: null,
    birth: new Date(2000, 4, 12), // Begins by 0,
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