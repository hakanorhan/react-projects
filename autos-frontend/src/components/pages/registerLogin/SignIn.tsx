import axios from 'axios';
import { ChangeEvent, FC, ReactNode, lazy, memo, useCallback, useMemo, useState } from 'react';
import { Roles, URLs } from '../../../constants/values.js';
/* Material UI */
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Check from '@mui/icons-material/Check';

import { formularEmailValid, formularPasswordValid } from '../../../regex/validHelper.js';
import { SignInForm } from '../../../interfaces/types.js';
import { notifyError } from '../../../helper/toastHelper.js';
import { useNavigate } from 'react-router-dom';

import { AuthResponse } from '../../../interfaces/types.js';
import { scrollToTop } from '../../../helper/helper.js';
import InputAdornment from '@mui/material/InputAdornment';
const LazyLinkComponent = lazy(() => import('./LazyLinkComponent.js'))
interface HeaderIconProps {
  children: ReactNode
}

const SignIn: React.FC = () => {

  const navigate = useNavigate();

  const signInForm: SignInForm = {
    email: "",
    password: ""
  }

  scrollToTop();

  const [form, setForm] = useState<SignInForm>(
    signInForm
  );

  const [isEmailValid, setEmailIsValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = form.email;
    const password = form.password;

    // if email and password is valid
    if (!isEmailValid) {
      notifyError("email-signin", "Bitte prüfen Sie das Email-Feld.")
    } else if (!isPasswordValid) {
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

  const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setForm({...form, ['email']: value })
    const isValid = formularEmailValid(value)
    setEmailIsValid(isValid)
  }, [form.email])

  const HeaderIconComponent: FC<HeaderIconProps> = memo(({ children }) => {
    return (
      <div className='headericon-style'>
      { children }
    </div> 
    )
  })

  const formElement = useMemo(() => (<div>
    <form onSubmit={handleSubmit} noValidate>
          
    <TextField autoComplete='on'  error={false} id='email' label="Email" variant='standard' 
    InputProps={{
      endAdornment: <InputAdornment position='end'><Check /></InputAdornment>
    }}
    onChange={ handleEmailChange } />

    <TextField autoComplete='on' type='password' error={false} id='password' label="Passwort" variant='standard' 
    InputProps={{
      endAdornment: <InputAdornment position='end'><Check /></InputAdornment>
    }}
    onChange={(event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setForm({...form, ['password']: value })
      const isValid = formularPasswordValid(value)
      setIsPasswordValid(isValid)
    }} />
    
    {/*
    <TextFieldCars id='email' label='Email' onChange={value => handleOnChange('email', value)} regex={REGEX_EMAIL} />
    <TextFieldCarsPassword1 id='password' label='Password' onChange={value => handleOnChange('password', value)} />
*/}
    <Button fullWidth type='submit' variant="contained">Sign in</Button>
  </form>

  <LazyLinkComponent />
  
</div>
  ), [])

  return (
  
      <div className='login-register-content'>
  
      <HeaderIconComponent>
        <LockPersonIcon fontSize='large'/>
      </HeaderIconComponent>

      {formElement}

      </div>
  )
}

export default memo(SignIn);