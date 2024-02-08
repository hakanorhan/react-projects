import RegisterAdminRequest from '../../../../autos-backend/src/interfaces/RegisterAdminRequest.js';
import RegisterResponse from '../../../../autos-backend/src/interfaces/RegisterResponse.js';
import RegisterPersonInfo from '../../../../autos-backend/src/interfaces/RegisterPersonInfo.js';
import Address from '../../../../autos-backend/src/interfaces/Address.js';
import WhoCreateDelete from '../../../../autos-backend/src/interfaces/WhoCreateDelete.js';

import axios from 'axios';

import {
  useState,
  MouseEvent
} from 'react';

import { MuiTelInput } from 'mui-tel-input';

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
  OutlinedInput,
  Grid,
  Card,
  CardMedia,
  Paper,
  Input
} from '@mui/material';

import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

const address: Address = {
    streetnr: "",
    zipcode: "",
    city: "",
    blandid: -1
  }
  
  const registerPerson: RegisterPersonInfo = {
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
  
  const whoCreateDelete: WhoCreateDelete = {
    createdFrom: -1,
    deletedFrom: null
  };

export default function SignUpComponent() {

  const [value, setValue] = useState('');
  const handleChange = (newValue: string) => {
    setValue(newValue);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const date = new Date(1989, 11, 4);
    // date.toISOString().slice(0, 10)


    // All needed informations for register new admin
    const formData: RegisterAdminRequest = {
      personinfo: registerPerson,
      whoCreateDelete
    };

    const [useStateFormData, setUseStateFormData] = useState(formData);



    await axios.post<RegisterResponse>('http://localhost:3001/dashboard-register',
      formData)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{ width:'40%' }}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        alignContent='center'
      >
        <FormLabel sx={{ color: 'black', fontSize: '22px', fontWeight: 'bold' }}>Create account</FormLabel>

        <FormGroup>
          <form onSubmit={handleSubmit}>

            <Box>

              <TextField
                label="Name"
                id="standard-start-adornment"
                variant="standard"
                sx={{width:' 65%', margin:'auto'}}
              />

              <TextField
                label="Nachname"
                id="standard-start-adornment"
                variant="standard"
                sx={{ m: 1, marginBottom: 2 }}
              />


              <TextField
                label="Email"
                id="standard-start-adornment"
                sx={{ m: 1, marginBottom: 2 }}
                variant="standard"
                InputProps={{
                  startAdornment: <InputAdornment position="start">@</InputAdornment>,
                }}
              />
              <MuiTelInput
                sx={{ m: 1, marginBottom: 2 }}
                forceCallingCode
                continents={['EU']}
                defaultCountry='DE'
                value={value}
                onChange={handleChange}
                variant='standard'
                label="Nummer"
              />

              <FormControl sx={{ m: 1, marginBottom: 2 }} variant="standard">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <Input
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
                />
              </FormControl>

              <Button type='submit' variant='outlined' sx={{ m: 1 }}>Register Admin</Button>
            </Box>
          </form>
        </FormGroup>
      </Box>
  )
}
