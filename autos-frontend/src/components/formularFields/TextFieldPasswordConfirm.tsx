import React, { useState, useEffect } from 'react'
import { IUseFormPasswordConfirm } from '../../interfaces/IUseForm'
import * as ValidHelper from '../../helper/validHelper';
import { ValidParagraph, primaryColorMain } from '../../themes/ThemeColor';
import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Visibility, VisibilityOff } from '@mui/icons-material';

/**
 * This component have two Password fields.
 * This fields are used in formular.
 * Password and Confirm Password.
 * @param param TextField Password and TextField Confirm Password
 * @returns TextFieldPasswordConfirm component
 */
const TextFieldPasswordConfirm: React.FC<IUseFormPasswordConfirm> = ({ passwordField, passwordConfirmField }) => {

    // Password1
    const [password1Match, setPassword1Match] = useState(false);
    const [password1ValueChnged, setPassword1ValueChanged] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleMouseDownPassword1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const onChangePassword1 = () => {
        setPassword1ValueChanged(true)
        const passwordValue: string | undefined = passwordField.inputRef.current?.value;
        if (passwordValue) {
            setPassword1Match(ValidHelper.formularPasswordValid(passwordValue));
        }
    }

    const ValidationMessages = () => {
        // to perform useEffect
        setPassword1ValueChanged(false);
        const passwordValue = passwordField.inputRef.current?.value;
        if (passwordValue) {
            return ValidHelper.passwordSpecificValid(passwordValue).map(item => <ValidParagraph key={item.message} style={{ color: item.isValid ? 'orange' : primaryColorMain }}> {item.message} </ValidParagraph>)

        } else {
            return ValidHelper.passwordSpecificValid("").map(item => <ValidParagraph key={item.message} style={{ color: item.isValid ? 'orange' : primaryColorMain }}> {item.message} </ValidParagraph>)
        }
    }

    // Updating specific validations
    useEffect(() => {
        ValidationMessages();

        // if password1 changes, the validation process for password2 
        validPassword2();

        // on every onChange, password1ValueChanged changes from true to false. recognizing onChange to perform speicif validation
    }, [password1ValueChnged])

    // Password2
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
        const password1Value = passwordField.inputRef.current?.value;
        const password2Value = passwordConfirmField.inputRef.current?.value;
        if (password1Value && password2Value) {
            setPassword2Match(ValidHelper.formularPasswordValid(password2Value) && ValidHelper.password2Valid(password1Value, password2Value))
        } else {
            setPassword2Match(false);
        }
    }


    return (
        <>
            {/* Password1 */}
            <Box>
                <FormControl fullWidth variant="outlined" >
                    <InputLabel htmlFor="outlined-adornment-password">{passwordField.label}</InputLabel>
                    <OutlinedInput
                        id={passwordField.id}
                        inputRef={passwordField.inputRef}
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
                        label={passwordField.label}
                    />
                </FormControl>

                <ValidationMessages />

            </Box>


            {/* Password2 */}
            <Box sx={{ paddingTop: '1rem' }}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{passwordConfirmField.label}</InputLabel>
                    <OutlinedInput
                        id={passwordConfirmField.id}
                        inputRef={passwordConfirmField.inputRef}
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
                        label={passwordConfirmField.label}
                    />
                </FormControl>

            </Box>
        </>
    )
}

export default TextFieldPasswordConfirm;
