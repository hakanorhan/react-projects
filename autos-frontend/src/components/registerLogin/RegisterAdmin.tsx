import { MuiTelInput } from 'mui-tel-input';

import RegisterAdminRequest from '../../../../autos-backend/src/interfaces/RegisterAdminRequest.js';
import RegisterResponse from '../../../../autos-backend/src/interfaces/RegisterResponse.js';
import RegisterPersonInfo from '../../../../autos-backend/src/interfaces/RegisterPersonInfo.js';
import Address from '../../../../autos-backend/src/interfaces/Address.js';
import WhoCreateDelete from '../../../../autos-backend/src/interfaces/WhoCreateDelete.js';

import axios from 'axios';

import DatePickerComponent from '../mui-components/DatePickerComponent.jsx';

import { 
  useState,
  MouseEvent
} from 'react';

import { 
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  TextField, 
  FormGroup,
  FormLabel,
  Button,
  OutlinedInput
} from '@mui/material';

import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2.js';

const address: Address = {
  streetnr: "",
  zipcode: "",
  city: "",
  blandid: -1
}

const registerPerson : RegisterPersonInfo = {
  name: "",
  familyname: "",
  email: "",
  password1: "",
  password2: "",
  telnr: "",
  birth: "",
  isactive: true, 
  address
};

const whoCreateDelete: WhoCreateDelete  = {
  createdFrom: -1,
  deletedFrom: null
};

function RegisterAdmin() {

  const [value, setValue] = useState('');
  const handleChange = (newValue:string) => {
    setValue(newValue);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const date = new Date(1989, 11, 4);
    // date.toISOString().slice(0, 10)
    

    // All needed informations for register new admin
    const formData : RegisterAdminRequest = {
      personinfo: registerPerson,
      whoCreateDelete
    };

    const [useStateFormData, setUseStateFormData] = useState(formData);


    
    await axios.post<RegisterResponse>('http://localhost:3001/dashboard-register',
     formData)
      .then(response => console.log(response) )
      .catch(err => console.log(err));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
      
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      alignContent='center'  
    >

      <FormLabel>Registrierung</FormLabel>
      <FormGroup>
      <form onSubmit={handleSubmit}>
      
      <Grid2>
      <TextField
          label="Name"
          id="standard-start-adornment"
          sx={{ m: 1, width: '47%' }}
          variant="outlined"
        />

      <TextField
          label="Nachname"
          id="standard-start-adornment"
          sx={{ m: 1, width: '47%' }}
          variant="outlined"
        />
      
      <br />
        
        <br />
        <TextField
          label="Email"
          id="standard-start-adornment"
          sx={{ m: 1, width: '47%' }}
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>,
          }}
        />
        <MuiTelInput 
          sx={{ m: 1, width: '47%' }}
          forceCallingCode
          continents={['EU']}
          defaultCountry='DE'
          value={value}
          onChange={handleChange}
          variant='outlined'
          label="Nummer"
        />
        <br />
         <Box sx={{ width:'100%' }}>
          <DatePickerComponent />
         </Box>
        <br />
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: '47%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button type='submit' variant='outlined' sx={{ width: '100%' }}>Register Admin</Button>
        </Grid2>
        <br /><br />
      </form>
      </FormGroup>
    </Box>
  )
}

export default RegisterAdmin;
/* Input importieren
  <Box
        component='img'
        sx={{ width: 1/2, objectFit:'cover'}} 
        alt='Register image'
        src='register_image.jpg'
        >
      </Box>
*/