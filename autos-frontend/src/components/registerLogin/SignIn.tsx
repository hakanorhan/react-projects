import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import TextFielProps from '../../interfaces/TextfieldProps.js';
import LoginUser from '../../../../autos-backend/src/interfaces/LoginUser.js';
import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import LockPersonIcon from '@mui/icons-material/LockPerson';

import { REGEX_EMAIL, REGEX_PASSWORD } from '../../../../autos-backend/src/regex/Regex.js';

import {
  Button,
  FormControl,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput
} from '@mui/material';




const SignIn: React.FC = () => {
  // --------------------------------------------------------
  // react-hook-form implementations
  // --------------------------------------------------------
  type FormValues = {
    email: string,
    password: string
  }

  const textFieldEmail: TextFielProps = {
    id: 'email',
    htmlFor: 'Email',
    label: 'email',
    required: 'Email is required',
    patternRegex: REGEX_EMAIL,
    regexMessage: 'Invalid email',
  }

  const textFielPassword: TextFielProps = {
    id: 'password',
    htmlFor: 'Password',
    label: 'password',
    required: 'Password should have min 8 characters',
    patternRegex: REGEX_PASSWORD,
    regexMessage: 'Should have min 8 characters',
  }

  const form = useForm<FormValues>();
  const { register, handleSubmit, formState, getValues } = form;
  const { errors } = formState;
  const onSubmit = async (data: FormValues) => {
    // --------------------------------------------------------
    const formData: LoginUser = {
      email: getValues('email'),
      password: getValues('password')
    }

    await axios.post<LoginUser>('http://localhost:3001/signin',
      formData)
      .then(response => console.log(response.data))
      .catch(err => console.log(err));

  }

  const [emailMatch, setEmailMatch] = useState(false);

  // --------------------------------------------------------
  // Password
  // --------------------------------------------------------
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div style={{ backgroundColor:'whitesmoke', display:'flex',flexDirection:'column', margin: 'auto', width: '400px', paddingTop: '60px' }}>
      <div style={{ margin:'auto', width:'400px', textAlign:'center', marginBottom:'1rem' }}><LockPersonIcon fontSize='large'/></div>
      <h2 style={{margin:'auto', width:'400px', textAlign:'center', marginBottom:'2rem'}}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      
      {/* Email */}
      <FormControl fullWidth variant="outlined" sx={{marginBottom: '0.5rem'}}>
          <InputLabel htmlFor="outlined-adornment-password">{textFieldEmail.htmlFor}</InputLabel>
          <OutlinedInput
            id={textFieldEmail.id}
            {...register('email', 
              {required: textFieldEmail.required,
                onChange: (e) => { (getValues('email').match(textFieldEmail.patternRegex)) ? setEmailMatch(true) : setEmailMatch(false)}, 
                pattern: {
                  value: textFieldEmail.patternRegex,
                  message: textFieldEmail.regexMessage,
            }})}
            
            endAdornment={
              <InputAdornment position="end">
                <IconButton disabled
                      aria-label="check visibility"
                    >
                      {emailMatch ? <CheckIcon /> : ""}
                    </IconButton>
              </InputAdornment>
            }
            label="Email"
          />
        </FormControl>
        
        <p style={{ color: 'red', textAlign: 'left', marginBottom:'1rem' }}> {errors.email?.message} &nbsp;</p>

        {/* Password */}
        <FormControl fullWidth variant="outlined" sx={{marginBottom: '0.5rem'}}>
          <InputLabel htmlFor="outlined-adornment-password">{textFielPassword.htmlFor}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            {...register('password', 
              {required: textFielPassword.required,
                pattern: {
                  value: textFielPassword.patternRegex,
                  message: textFielPassword.regexMessage,
            }})}
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
        <p style={{ color: 'red', textAlign: 'left', marginBottom:'2rem' }}> {errors.password?.message} &nbsp;</p>

          <Button fullWidth type='submit' variant="contained" sx={{ marginBottom:'1rem' }}>Sign in</Button>
          <div style={{ display:'flex', marginBottom:'4rem'}}>
            <div style={{ width:'40%' }}><p>Forgot Password</p></div>
            <div style={{ width:'60%' }}><p style={{ textAlign:'right' }}>Don't have an account? Sign Up</p></div>
          </div>
      </form>
    </div>

  )
}

export default SignIn;