import axios from 'axios';
import React, { useState } from 'react';
import { Roles } from '../../../enums/Roles.js';

/* Material UI */
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Box, Button, Typography } from '@mui/material';
import { MainComponentWidth, HeaderIcon, buttonHeight, mainComponentHeight } from '../../../themes/Theme.js';

import * as validHelper from '../../../helper/validHelper.js';

/* Hot Toast */
import { Toaster } from 'react-hot-toast';
import { URLs } from '../../../../../autos-backend/src/enums/URLs.js';
import TextFieldCars from '../../formularFields/TextFieldCars.js';
import { REGEX_EMAIL } from '../../../regex/REGEX.js';
import TextFieldCarsPassword1 from '../../formularFields/TextFieldCarsPassword.js';
import { SignInForm } from '../../../interfaces/types.js';
import { notifyError } from '../../../helper/toastHelper.js';
import { Link, useNavigate } from 'react-router-dom';
import { AuthResponse } from '../../../interfaces/types.js';

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
    setForm({ ...form, [fieldName]: fieldValue })
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = form.email;
    const password = form.password;

    // if email and password is valid
    if (!validHelper.formularEmailValid(email)) {
      notifyError("email-signin", "Bitte prüfen Sie das Email-Feld.")
    } else if (!validHelper.formularPasswordValid(password)) {
      notifyError("password-signin", "Bitte prüfen Sie das Passwort-Feld.")
    } else {

      await axios.post<AuthResponse>(URLs.ORIGIN_SERVER + URLs.POST_SIGNIN,
        { email, password }, { withCredentials: true })
        .then(function (response) {
          const authResponse: AuthResponse = response.data;

          if (authResponse && authResponse.authenticated) {

            switch (authResponse.role) {
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
        .catch((error) => {

          notifyError("error401", error.response.data);
        });
    }
  }

  return (
    <Box>
      <Toaster />
      <MainComponentWidth sx={{ height: mainComponentHeight }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '7rem', marginBottom: '7rem' }}>
          <HeaderIcon><LockPersonIcon fontSize='large' /></HeaderIcon>
          <Typography variant='h4' component="h1" sx={{ margin: 'auto', color: 'primary.main' }}>Anmelden</Typography>
        </Box>

        <form onSubmit={handleSubmit} noValidate>

          <TextFieldCars id='email' label='Email' onChange={value => handleOnChange('email', value)} regex={REGEX_EMAIL} />
          <TextFieldCarsPassword1 id='password' label='Password' onChange={value => handleOnChange('password', value)} />

          <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem', height: buttonHeight }}>Sign in</Button>
          <div style={{ display: 'flex', marginBottom: '4rem' }}>
            <Box style={{ width: '40%', color: 'primary.main' }}>
              <Typography sx={{ color: 'primary.main' }} variant='body1' component='p'>Passwort vergessen</Typography>
            </Box>
            <div style={{ width: '60%', display: 'flex', justifyContent: 'flex-end' }}>
              <Link to={URLs.POST_SIGINUP} style={{ textDecoration: 'none' }}><Typography variant='body1' component='p' sx={{ color: 'primary.main' }}>Haben Sie kein Konto? Registrieren</Typography> </Link>
            </div>
          </div>
        </form>
        <Box>

        </Box>
      </MainComponentWidth>
    </Box>
  )
}

export default SignIn;