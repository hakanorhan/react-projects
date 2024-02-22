import { createTheme } from "@mui/material";

export const formWitdhXS = '300px';
export const textFieldPaddingBottom = '1rem';

const themeHeadline = createTheme();
themeHeadline.typography.h1 = {
    marginBottom: "2rem",
    [themeHeadline.breakpoints.up(600)]: {
      fontSize: "1.5rem",
    },
    [themeHeadline.breakpoints.up("sm")]: {
      fontSize: "2.5rem",
    },
    [themeHeadline.breakpoints.up("md")]: {
      fontSize: "3.5rem",
    },
  };


  export const formControl = createTheme();
  if(!formControl.components) { formControl.components = {} }
  formControl.components.MuiFormControl = {
    styleOverrides: {
      root: {
        [formControl.breakpoints.up("xs")]: {
          paddingBottom: '1rem'
        }
      }
    }
  }


  const formContainer = createTheme();

  // Component can be undefined
  if(!formContainer.components) { formContainer.components = {} }

  formContainer.components.MuiContainer  = {
    styleOverrides: {
      root: {
        display: "flex",
        [formContainer.breakpoints.up("xs")]: {},
        [formContainer.breakpoints.up("sm")]: {},
        [formContainer.breakpoints.up("md")]: {},
      },
    },
  };