import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check'
/* Interfaces */
import LoginUser from '../../../../../autos-backend/src/interfaces/LoginUser.js';
import { Roles } from '../../../../../autos-backend/src/enums/Roles.js';
import { Visibility, VisibilityOff } from '@mui/icons-material';

/* Material UI */
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Typography } from '@mui/material';
import { DivFormularAdmin, HeaderIcon, primaryColorMain } from '../../../themes/ThemeColor.js';

import { IResponseSignInData } from '..7../../../../autos-backend/src/interfaces/signin/IResponseSignInData.js';

import * as validHelper from '../../../helper/validHelper.js';
import { useNavigate } from 'react-router-dom';

/* Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
const notifyError = (message: string) => toast.error(message, {
  duration: 4000,
  position: 'bottom-center'

});

const notifySuccess = (message: string) => toast.success(message, {
  duration: 2000,
  position: 'top-center'

});

const SignIn: React.FC = () => {

  const location = useLocation();
  const { state } = location;
  const successMessage = state && state.successMessage;
  if(successMessage) {}

  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Check icon
  const [emailMatch, setEmailMatch] = useState(false);
  // Check icon
  const [passwordMatch, setPasswordMatch] = useState(false);
  // Show password
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email: string | undefined = emailRef.current?.value;
    const password: string | undefined = passwordRef.current?.value;

    // if email and password is valid
    if (email && password && validHelper.formularValuesValid(emailMatch, passwordMatch)) {
      const formData: LoginUser = {
        email: email,
        password: password
      }

      await axios.post<IResponseSignInData>('http://localhost:3001/signin',
        formData, {withCredentials: true})
        .then(function(response) {

          // personId name and role exists
          if(response.data.personId && response.data.name && response.data.role) {
          switch(response.data.role) {
            case Roles.ADMIN: {
              navigate('/dashboard/admin');
            } break;
            case Roles.SERVICE: {} break;
            case Roles.USER: {
              navigate('/inseratecar');
            } break;
          }
        }
        })
        .catch(err => {
          notifyError(err.response.data.message);
        });
    } else {
      notifyError("Email or Password is invalid");
    }
  }

  const handleEmail  = () => {
    const emailValue:string | undefined = emailRef.current?.value;
    if(emailValue) setEmailMatch(validHelper.formularEmailValid(emailValue));
    
  }

  const handlePassword = () => {
    const passwordValue: string | undefined = passwordRef.current?.value;
    if(passwordValue) {setPasswordMatch(validHelper.formularPasswordValid(passwordValue));}
  }

  return (
    <>
      <Toaster />
      <DivFormularAdmin>
        <HeaderIcon><LockPersonIcon fontSize='large' /></HeaderIcon>
        <Typography variant='h4' component="h1">Sign In</Typography>
        <form onSubmit={handleSubmit} noValidate>
        <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">{"Label"}</InputLabel>
        <OutlinedInput
          id="email"
          inputRef={emailRef}
          onChange={handleEmail}
          endAdornment={
            <InputAdornment position="end">
              <IconButton disabled
                aria-label="check visibility"
                
              >
                {emailMatch ? <CheckIcon /> : ""}
              </IconButton>
            </InputAdornment>
          }
          label="Label"
        />
      </FormControl>

      <FormControl  variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="password"
          inputRef={passwordRef}
          onChange={handlePassword}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton disabled
                aria-label="check visibility"
              >
                {passwordMatch ? <CheckIcon /> : ""}
              </IconButton>
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

          <Button fullWidth type='submit' variant="contained" sx={{ marginBottom:'1rem' }}>Sign in</Button>
          <div style={{ display: 'flex', marginBottom: '4rem' }}>
            <div style={{ width: '40%', color: primaryColorMain }}><p>Forgot Password</p></div>
            <div style={{ width: '60%', display: 'flex', justifyContent:'flex-end' }}><Link to="/signup" style={{ textDecoration: 'none', color: primaryColorMain }}>Don't have an account? Sign Up </Link></div>
          </div>
        </form>
      </DivFormularAdmin>
    </>
  )
}

export default SignIn;