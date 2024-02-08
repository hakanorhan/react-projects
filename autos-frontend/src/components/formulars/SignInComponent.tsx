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
    streetnr: "bbgfb",
    zipcode: "bfbfgbfb",
    city: "bfgbfbf",
    blandid: -1
  }
  
  const registerPerson: RegisterPersonInfo = {
    name: "bfbfbf",
    familyname: "bfbfb",
    email: "bfbfb",
    password1: "bfgbfb",
    password2: "bfgbfb",
    telnr: "bfgb",
    birth: "22-10-1989",
    isactive: true,
    address
  };
  
  const whoCreateDelete: WhoCreateDelete = {
    createdFrom: -1,
    deletedFrom: null
  };

export default function SignInComponent() {

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
      
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        alignContent='center'
      >
        <Box sx={{ width:'85%', margin:'auto' }}>
        <FormLabel sx={{ color: 'black',  fontSize: '22px', fontWeight: 'thin' }}>Create account</FormLabel>

        <FormGroup>
          <form onSubmit={handleSubmit}>

            <Box>

             
              <TextField
                fullWidth
                label="Email"
                id="standard-start-adornment"
                sx={{ marginTop:4, marginBottom: 2 }}
                variant="standard"
                InputProps={{
                  startAdornment: <InputAdornment position="start">@</InputAdornment>,
                }}
              />
              

              <FormControl fullWidth sx={{ marginBottom: 2 }} variant="standard">
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

              <Button type='submit' variant='outlined' sx={{color:'white', backgroundColor:'black' }} fullWidth >Login</Button>
            </Box>
          </form>
        </FormGroup>
      </Box>
      </Box>
  )
}
