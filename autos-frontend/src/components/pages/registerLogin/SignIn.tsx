import axios from 'axios';
import { FC, ReactNode, memo, useState } from 'react';
import { Roles, URLs } from '../../../constants/values.js';
/* Material UI */
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { SignInForm } from '../../../interfaces/types';
import { notifyError } from '../../../helper/toastHelper';
import { Link, useNavigate } from 'react-router-dom';

import { AuthResponse } from '../../../interfaces/types';
import { scrollToTop } from '../../../helper/helper';
import { MainComponentWidth, XS_MAX_WIDTH_430 } from '../../../themes/Theme';
import TextFieldCars from '../../formularFields/TextFieldCars';
import TextFieldCarsPassword1 from '../../formularFields/TextFieldCarsPassword';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../../../regex/REGEX';
import { formularEmailValid, formularPasswordValid } from '../../../regex/validHelper';
import { Typography, useMediaQuery } from '@mui/material';

interface HeaderIconProps {
  children: ReactNode
}

const SignIn: React.FC = () => {

  const xsQuery = useMediaQuery(XS_MAX_WIDTH_430);
  const navigate = useNavigate();

  const signInForm: SignInForm = {
    email: "",
    password: ""
  }

  scrollToTop();

  const [form, setForm] = useState<SignInForm>(
    signInForm
  );

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = form.email;
    const password = form.password;
    // if email and password is valid
    if (!formularEmailValid(email)) {
      notifyError("email-signin", "Bitte prüfen Sie das Email-Feld.")
    } else if (!formularPasswordValid(password)) {
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
        .catch(() => {

          notifyError("error401", "E-Mail oder Passwort ist inkorrekt");
        });
    }
  }

  const handleOnChange = (fieldName: string, fieldValue: string) => {
    setForm(prevForm => ({
      ...prevForm,
      [fieldName]: fieldValue
    }));
  };


  const HeaderIconComponent: FC<HeaderIconProps> = memo(({ children }) => {
    return (
      <Box sx={{
        margin: 'auto',
        marginTop: xsQuery ? '2rem' : '7rem',
        marginBottom: '2rem'
      }}>
        {children}
      </Box>
    )
  })

  const formElement = <div>
    <form onSubmit={handleSubmit} noValidate>

      <TextFieldCars label='Email' onChange={value => handleOnChange('email', value)} regex={REGEX_EMAIL} />
      <TextFieldCarsPassword1 label='Password' onChange={value => handleOnChange('password', value)} regex={REGEX_PASSWORD} />

      <Button fullWidth type='submit' variant="contained">Sign in</Button>
    </form>

    <Typography variant='body1'>Passwort vergessen</Typography>
    <Typography sx={{ textDecoration:'none', color:'text.primary' }} to={URLs.POST_SIGINUP} component={Link}>Haben Sie kein Konto? Registrieren</Typography>

  </div>


  return (
    <MainComponentWidth>
      <HeaderIconComponent>
        <LockPersonIcon fontSize='large' sx={{ color: 'icon.main' }} />
      </HeaderIconComponent>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ marginBottom:'2rem' }} variant='h2' component='h1'>Login</Typography>
      </div>
      {formElement}
    </MainComponentWidth>
  )
}

export default memo(SignIn);