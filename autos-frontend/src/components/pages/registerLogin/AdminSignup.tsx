import IAxiosDataSignUp from '../../../../../autos-backend/src/interfaces/ISignUpUser.js';
import { IResponseSignup } from '../../../../../autos-backend/src/interfaces/IResponseSignup.js';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Box } from '@mui/material';
import * as ReduxHelper from '../../../helper/validHelper.js';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check'
import * as ValidHelper from '../../../helper/validHelper.js';

import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { MuiTelInput } from 'mui-tel-input';


/* Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
import { DivFormularAdmin, DivTwoFieldsWithSpaceBetween, DivWidthTwoFieldsRow, ValidParagraph, primaryColorMain } from '../../../themes/ThemeColor.js';
const notifyError = (message: string) => toast.error(message, {
    duration: 4000,
    position: 'bottom-center'

});

const notifySuccess = (message: string) => toast.success(message, {
    duration: 4000,
    position: 'top-center'

});

const AdminSignup: React.FC = () => {

    const navigate = useNavigate();

    // TelNr
    const [telNr, setTelNr] = React.useState('')

    const handleChangeTelNr = (telNr: string) => {
        setTelNr(telNr)
    }

    // Name
    const [nameMatch, setNameMatch] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const handleName = () => {
        const nameValue: string | undefined = nameRef.current?.value;
        if (nameValue) setNameMatch(ValidHelper.formularNameValid(nameValue));
    }
    // Familyname
    const [familynameMatch, setFamilynameMatch] = useState(false);
    const familynameRef = useRef<HTMLInputElement>(null);
    const handleFamilyname = () => {
        const nameValue: string | undefined = familynameRef.current?.value;
        if (nameValue) setFamilynameMatch(ValidHelper.formularNameValid(nameValue));
    }

    // Email
    const emailRef = useRef<HTMLInputElement>(null);
    const [emailMatch, setEmailMatch] = useState(false);
    const handleEmail = () => {
        const emailValue: string | undefined = emailRef.current?.value;
        if (emailValue) setEmailMatch(ValidHelper.formularEmailValid(emailValue));
    }

    // Password1
    const password1Ref = useRef<HTMLInputElement>(null);
    const [password1Match, setPassword1Match] = useState(false);
    const [password1ValueChnged, setPassword1ValueChanged] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleMouseDownPassword1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const onChangePassword1 = () => {
        setPassword1ValueChanged(true)
        const passwordValue: string | undefined = password1Ref.current?.value;
        if (passwordValue) {
            setPassword1Match(ReduxHelper.formularPasswordValid(passwordValue));
        }
    }

    const ValidationMessages = () => {
        // to perform useEffect
        setPassword1ValueChanged(false);
        const passwordValue = password1Ref.current?.value;
        if (passwordValue) {
            return ReduxHelper.passwordSpecificValid(passwordValue).map(item => <ValidParagraph key={item.message} style={{ color: item.isValid ? 'orange' : primaryColorMain }}> {item.message} </ValidParagraph>)

        } else {
            return ReduxHelper.passwordSpecificValid("").map(item => <ValidParagraph key={item.message} style={{ color: item.isValid ? 'orange' : primaryColorMain }}> {item.message} </ValidParagraph>)
        }
    }

    // Updating specific validations
    useEffect(() => {
        ValidationMessages

        // if password1 changes, the validation process for password2 
        validPassword2();

        // on every onChange, password1ValueChanged changes from true to false. recognizing onChange to perform speicif validation
    }, [password1ValueChnged])


    // Password2
    const password2Ref = useRef<HTMLInputElement>(null);
    const [password2Match, setPassword2Match] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
    const handleMouseDownPassword2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const password2OnChange = () => {
        validPassword2();
    }

    const validPassword2 = () => {
        const password1Value = password1Ref.current?.value;
        const password2Value = password2Ref.current?.value;
        if (password1Value && password2Value) {
            setPassword2Match(ReduxHelper.formularPasswordValid(password2Value) && ReduxHelper.password2Valid(password1Value, password2Value))
        } else {
            setPassword2Match(false);
        }
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {

        event.preventDefault();

        const name = nameRef.current?.value;
        const familyname = familynameRef.current?.value;
        const email = emailRef.current?.value;
        const password1 = password1Ref.current?.value;
        const password2 = password2Ref.current?.value;

        if (name && familyname && email && password1 && password2) {

            // all Formular field are valid
            if (ReduxHelper.formularSignUpIsValid(name, familyname, email, password1, password2)) {

                const formData: IAxiosDataSignUp = {
                    name: name,
                    familyname: familyname,
                    email: email,
                    password: password1,
                    password2: password2,
                    isCarDealer: isChecked
                }

                await axios.post<IResponseSignup>('http://localhost:3001/signup',
                    formData)
                    .then(function (response) {
                        notifySuccess("response.data.message")
                        navigate('/signin', { state: { successMessage: "Signup successful!" } })

                    }).catch(function (err) {
                        notifyError(err.response.data.message)
                    })
            } else {
                notifyError("Please check your inputs");
            }
        } else {
            notifyError("Please check your inputs");
        }
    }



    return (<>
        < Toaster />

        <form onSubmit={handleSubmit} noValidate>
            <DivFormularAdmin>

                {/* Left side */}
                <Box>
                    <DivTwoFieldsWithSpaceBetween>

                        {/* Name */}
                        <DivWidthTwoFieldsRow>
                            <FormControl required variant="outlined" >
                                <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
                                <OutlinedInput
                                    id="name"
                                    onChange={handleName}
                                    inputRef={nameRef}
                                    label="Name"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton disabled
                                                aria-label="check visibility"
                                            >
                                                {nameMatch ? <CheckIcon /> : ""}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </DivWidthTwoFieldsRow>

                        {/* Nachname */}
                        <DivWidthTwoFieldsRow>
                            <FormControl required variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Familyname</InputLabel>
                                <OutlinedInput
                                    id="name"
                                    onChange={handleFamilyname}
                                    inputRef={familynameRef}
                                    label="Familyame"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton disabled
                                                aria-label="check visibility"
                                            >
                                                {familynameMatch ? <CheckIcon /> : ""}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </DivWidthTwoFieldsRow>
                    </DivTwoFieldsWithSpaceBetween>

                    {/* Email */}
                    <Box>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
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
                                label="Email"
                            />
                        </FormControl>
                    </Box>

                    {/* Password1 */}
                    <Box>
                        <FormControl variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                inputRef={password1Ref}
                                onChange={onChangePassword1}
                                type={showPassword1 ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton disabled
                                            aria-label="check visibility"
                                        >
                                            {password1Match ? <CheckIcon /> : ""}
                                        </IconButton>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword1}
                                            onMouseDown={handleMouseDownPassword1}
                                            edge="end"
                                        >
                                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <ValidationMessages />

                    </Box>

                    {/* Password2 */}
                    <Box>
                        <FormControl variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="password2"
                                inputRef={password2Ref}
                                onChange={password2OnChange}
                                type={showPassword2 ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton disabled
                                            aria-label="check visibility"
                                        >
                                            {password2Match ? <CheckIcon /> : ""}
                                        </IconButton>
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
                    </Box>

                </Box>

                <Box>

                    {/* Birth */}
                    <Box>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <DemoItem >
                                <DatePicker label="Birth" defaultValue={dayjs('2022-04-17')} />
                            </DemoItem>
                        </LocalizationProvider>
                    </Box>

                    {/* TelNr */}
                    <Box>
                        <MuiTelInput label="TelNr" defaultCountry={'DE'} value={telNr} onChange={handleChangeTelNr} />
                    </Box>

                    {/* Address and zipcode */}
                    <DivTwoFieldsWithSpaceBetween>
                        {/* Address */}
                        <DivWidthTwoFieldsRow>
                            <FormControl required variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Address Nr</InputLabel>
                                <OutlinedInput
                                    id="addressnr"
                                    onChange={handleName}
                                    inputRef={nameRef}
                                    label="Address Nr"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton disabled
                                                aria-label="check visibility"
                                            >
                                                {nameMatch ? <CheckIcon /> : ""}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </DivWidthTwoFieldsRow>

                        {/* Zipcode */}
                        <DivWidthTwoFieldsRow>
                            <FormControl required variant="outlined" >
                                <InputLabel htmlFor="outlined-adornment-password">Zipcode</InputLabel>
                                <OutlinedInput
                                    id="zipcode"
                                    onChange={handleFamilyname}
                                    inputRef={familynameRef}
                                    label="Zipcode"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton disabled
                                                aria-label="check visibility"
                                            >
                                                {familynameMatch ? <CheckIcon /> : ""}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </DivWidthTwoFieldsRow>
                    </DivTwoFieldsWithSpaceBetween>

                    {/* City */}
                    <Box>
                        <FormControl required variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">City</InputLabel>
                            <OutlinedInput
                                id="city"
                                onChange={handleFamilyname}
                                inputRef={familynameRef}
                                label="City"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton disabled
                                            aria-label="check visibility"
                                        >
                                            {familynameMatch ? <CheckIcon /> : ""}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>

                    {/* Bundesland */}
                    <Box>
                        <FormControl required variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Bundesland</InputLabel>
                            <OutlinedInput
                                id="bundesland"
                                onChange={handleFamilyname}
                                inputRef={familynameRef}
                                label="Bundesland"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton disabled
                                            aria-label="check visibility"
                                        >
                                            {familynameMatch ? <CheckIcon /> : ""}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>
                </Box>

                <Box>
                    <Button fullWidth type='submit' variant="contained">Create</Button>
                </Box>

            </DivFormularAdmin>

        </form>
    </>
    )
}

export default AdminSignup;