import { colors, createTheme } from "@mui/material";
import { styled } from "@mui/material";

/*
    xs, extra-small: 0px
    sm, small: 600px
    md, medium: 900px
    lg, large: 1200px
    xl, extra-large: 1536px
*/

const textFieldXSWitdh = '85%';
const textFieldSMWitdh = '550px';

export const primaryColorMain: string = colors.grey[600];
const primaryColorLight: string = colors.grey[300];

const secondaryColorMain: string = colors.red[500];

const themeColor = createTheme({
    
    palette: {
        primary: {
            main: primaryColorMain,
            light: primaryColorLight,
            dark: colors.grey[900],
            contrastText: 'white'
        },
        secondary: {
            main: secondaryColorMain,
            light: primaryColorLight,
            dark: colors.grey[900],
            contrastText: 'white'
        }
    },
    components: {
        MuiFormControl: {
            styleOverrides: {
                root: {
                    paddingBottom: '1rem',
                    width: '100%'
                }
            }
        }
    }, typography: {
        h4: {
            margin:'auto',
            fontWeight:'lighter',
            paddingBottom:'0.5rem',
            color: primaryColorMain
        },
    }    
});

/**
 * Responsive.
 * Width for Formular.
 * Left and right side.
 */
export const DivFormularAdmin = styled('div')(({ theme }) => ({
    display:'flex',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    margin: 'auto',
    flexDirection: 'column',
    [theme.breakpoints.up("xs")]: {
        width: textFieldXSWitdh,
        
    },
    [theme.breakpoints.up("sm")]: {
        width: textFieldSMWitdh,

    },
    [theme.breakpoints.up("lg")]: {
        width: textFieldSMWitdh
    }

}));

/**
 * Responsive.
 * In mobile view one textfield.
 * two fields in tablet and desktop in a same row
 */
export const DivTwoFieldsWithSpaceBetween = styled('div')(({ theme }) => ({
        display: 'flex',
        [theme.breakpoints.up("xs")]: {
            flexDirection: 'column'},
        [theme.breakpoints.up("md")]: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        }

}));

/**
 * Responsive.
 * Component DivTwoFieldsWithSpaceBetween.
 * Mobile 100% width.
 * Two Fields have 270px width.
 */
export const DivWidthTwoFieldsRow = styled('div')(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
        width: '100%' 
    },
    [theme.breakpoints.up("md")]: {
        width:'270px'
    }

}));

/**
 * Sign in and Signout icons.
 */
export const HeaderIcon = styled('div')(({ theme }) => ({
    margin:'auto',
    textAlign: 'center',
    color: primaryColorMain,
    [theme.breakpoints.up("xs")]: {
        width: textFieldXSWitdh,
        
    },
    [theme.breakpoints.up("sm")]: {
        width: textFieldSMWitdh,

    },

}));

export const ValidParagraph = styled('p')(({ theme }) => ({
    lineHeight: '1.4rem',
    paddingLeft: '.2rem',
}));

export default themeColor;