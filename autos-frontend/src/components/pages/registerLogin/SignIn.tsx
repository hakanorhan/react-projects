import axios from 'axios';
import React, { useEffect, useState } from 'react';
/* Interfaces */
import { Roles } from '../../../../../autos-backend/src/enums/Roles.js';

/* Material UI */
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Box, Button, Typography } from '@mui/material';
import { MainComponentWidth, HeaderIcon, primaryColorMain, buttonHeight, mainComponentHeight } from '../../../themes/ThemeColor.js';
import { UserInformation } from "../../../../../autos-backend/src/interfaces/auth/UserInformation.js";

import * as validHelper from '../../../helper/validHelper.js';

// TODO: set newimage
//import { setNewImage } from "../../../redux/features/imageSlice.js";
import { useDispatch } from "react-redux";

/* Hot Toast */
import { Toaster } from 'react-hot-toast';
import { URLs } from '../../../../../autos-backend/src/enums/URLs.js';
import { setRole, setUserLoggedIn } from '../../../redux/features/userlogged.js';
import TextFieldCars from '../../formularFields/TextFieldCars.js';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../../../../../autos-backend/src/regex/regex.js';
import TextFieldCarsPassword1 from '../../formularFields/TextFieldCarsPassword.js';
import { SignInForm } from '../../../../../autos-backend/src/interfaces/IAxiosData.js';
import { notifyError, notifySuccess } from '../../../helper/toastHelper.js';
import { Link, useNavigate } from 'react-router-dom';
import { AuthResponse } from '../../../../../autos-backend/src/interfaces/auth/AuthResponse.js';

const SignIn: React.FC = () => {

  const navigate = useNavigate();

  const signInForm: SignInForm = {
    email: "",
    password: ""
  }

  const [form, setForm] = useState<SignInForm>(
    signInForm
  );

    const handleOnChange = (fieldName: string, fieldValue: string) => {
      setForm({...form, [fieldName] : fieldValue})
    }

  const dispatch = useDispatch();

  // TODO: delete
  //const navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const email = form.email;
    const password = form.password;

    // if email and password is valid
    if(!validHelper.formularEmailValid(email)) {
      notifyError("email-signin", "Bitte prüfen Sie das Email-Feld.")
    } else if(!validHelper.formularPasswordValid(password)) {
      notifyError("password-signin", "Bitte prüfen Sie das Passwort-Feld.")
    } else {
      
      await axios.post<AuthResponse>(URLs.ORIGIN_SERVER + URLs.POST_SIGNIN,
        { email, password }, { withCredentials: true })
        .then(function (response) {
          const authResponse: AuthResponse = response.data;

          if (authResponse && authResponse.authenticated) {
            
            switch(authResponse.role) {
              case Roles.ADMIN:
                navigate(URLs.FETCH_INSERATE_PUBLISH);
                break;
              case Roles.USER:
                navigate(URLs.POST_INSERATE_CAR);
                break;
              default:
                notifyError("error401", "Sie haben keine Berechtigung");
            }
          }
        })
        .catch((err) => {
          const authResponse: AuthResponse = err.response.data;
          if(authResponse.errorMessage)
          notifyError("error401", authResponse.errorMessage);
        });
    }
  }

  return (
    <>
      <Toaster />
      <MainComponentWidth sx={{ height: mainComponentHeight }}>
        <Box sx={{ display: 'flex', flexDirection:'column', margin:'auto' }}>
          <HeaderIcon ><LockPersonIcon fontSize='large' /></HeaderIcon>
          <Typography variant='h4' component="h1">Sign In</Typography>
        </Box>
        <form onSubmit={handleSubmit} noValidate>

          <TextFieldCars id='email' label='Email' onChange={ value => handleOnChange('email', value)} regex={REGEX_EMAIL} /> 
          <TextFieldCarsPassword1 id='password' label='Password' onChange={ value => handleOnChange('password', value) } regex={REGEX_PASSWORD}  />

          <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem', height: buttonHeight }}>Sign in</Button>
          <div style={{ display: 'flex', marginBottom: '4rem' }}>
            <div style={{ width: '40%', color: primaryColorMain }}>
              <p>Forgot Password</p>
            </div>
            <div style={{ width: '60%', display: 'flex', justifyContent: 'flex-end' }}>
              <Link to={ URLs.POST_SIGINUP } style={{ textDecoration: 'none', color: primaryColorMain }}>Don't have an account? Sign Up </Link>
            </div>
          </div>
        </form>
      </MainComponentWidth>
    </>
  )
}

export default SignIn;