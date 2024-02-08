import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import TextFielProps from '../../interfaces/TextfieldProps.js';
import ISignUpUser from '../../../../autos-backend/src/interfaces/ISignUpUser.js';
import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import LockPersonIcon from '@mui/icons-material/LockPerson';

import {
  Button,
  FormControl,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormControlLabel
} from '@mui/material';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const SignUpUser: React.FC = () => {
  // --------------------------------------------------------
  // react-hook-form implementations
  // --------------------------------------------------------
  type FormValues = {
    name: string,
    familyname: string,
    email: string,
    password: string,
    password2: string,
    isCarDealer: boolean
  }

  const textFieldEmail: TextFielProps = {
    id: 'email',
    htmlFor: 'Email',
    label: 'email',
    required: 'Email is required',
    patternRegex: emailRegex,
    regexMessage: 'Invalid email',
  }

  const textFielPassword: TextFielProps = {
    id: 'password',
    htmlFor: 'Password',
    label: 'password',
    required: 'Password should have min 8 characters',
    patternRegex: passwordRegex,
    regexMessage: 'Should have min 8 characters',
  }

  const textFielPassword2: TextFielProps = {
    id: 'password2',
    htmlFor: 'Password',
    label: 'password2',
    required: 'Password should have min 8 characters',
    patternRegex: passwordRegex,
    regexMessage: 'Should have min 8 characters',
  }

  const form = useForm<FormValues>();
  const { register, handleSubmit, formState, getValues } = form;
  const { errors } = formState;
  const onSubmit = async (data: FormValues) => {
    // --------------------------------------------------------
    const formData: ISignUpUser = {
      name: getValues('name'),
      familyname: getValues('familyname'),
      email: getValues('email'),
      password: getValues('password'),
      password2: getValues('password2'),
      isCarDealer: getValues('isCarDealer')
    }

    await axios.post<ISignUpUser>('http://localhost:3001/signup',
      formData)
      .then(response => console.log(response))
      .catch(err => console.log(err));

  }

  const [emailMatch, setEmailMatch] = useState(false);

  // --------------------------------------------------------
  // Password
  // --------------------------------------------------------
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div style={{ backgroundColor:'whitesmoke', display:'flex',flexDirection:'column', margin: 'auto', width: '400px', paddingTop: '50px' }}>
      <div style={{ margin:'auto', width:'400px', textAlign:'center', marginBottom:'1rem' }}><LockPersonIcon fontSize='large'/></div>
      <h2 style={{margin:'auto', width:'400px', textAlign:'center', marginBottom:'2rem'}}>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      
      <div style={{ display:'flex', justifyContent:'space-between', width:'400px', marginBottom:'1rem' }}>
        
        {/* Name */}
        <div>
        <FormControl fullWidth variant="outlined" sx={{marginBottom: '0.5rem'}}>
          <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
          <OutlinedInput
            id={textFieldEmail.id}
            {...register('name')}
            label="Name"
          />
        </FormControl>  
        </div>

        {/* Nachname */}
        <div>
        <FormControl fullWidth variant="outlined" sx={{marginBottom: '0.5rem'}}>
          <InputLabel htmlFor="outlined-adornment-password">Nachname</InputLabel>
          <OutlinedInput
            id={textFieldEmail.id}
            {...register('familyname')}
            label="Name"
          />
        </FormControl>  
        </div>
      </div>

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
        
        <p style={{ color: 'red', textAlign: 'left', marginBottom:'0.5rem' }}> {errors.email?.message} &nbsp;</p>

        {/* Password1 */}
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
        <p style={{ color: 'red', textAlign: 'left', marginBottom:'0.5rem' }}> {errors.password?.message} &nbsp;</p>

        {/* Password2 */}
        <FormControl fullWidth variant="outlined" sx={{marginBottom: '0.5rem'}}>
          <InputLabel htmlFor="outlined-adornment-password">{textFielPassword2.htmlFor}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            {...register('password2', 
              {required: textFielPassword2.required,
                pattern: {
                  value: textFielPassword2.patternRegex,
                  message: textFielPassword2.regexMessage,
            }})}
            type={showPassword2 ? 'text' : 'password2'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword2}
                  edge="end"
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <p style={{ color: 'red', textAlign: 'left', marginBottom:'1rem' }}> {errors.password2?.message} &nbsp;</p>

        {/* Cardealer */}
        <FormControlLabel control={<Checkbox />} {...register('isCarDealer')} label="Are you a dealer?" />

          <Button fullWidth type='submit' variant="contained" sx={{ marginBottom:'1rem' }}>Sign in</Button>
          <div style={{ display:'flex', paddingBottom:'4rem'}}>
            <div style={{ width:'40%' }}><p>Forgot Password</p></div>
            <div style={{ width:'60%' }}><p style={{ textAlign:'right' }}>Don't have an account? Sign Up</p></div>
          </div>
      </form>
    </div>

  )
}

export default SignUpUser;