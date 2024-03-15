import { colors, createTheme } from "@mui/material";
import { styled } from "@mui/material";
import { yellow } from "@mui/material/colors";

/*
    xs, extra-small: 0px
    sm, small: 600px
    md, medium: 900px
    lg, large: 1200px
    xl, extra-large: 1536px
*/


const searchContainerXSWidth = '90%';
const searchContainerMDWidth = '90%';
const searchContainerLGWidth = '1075px';

export const ToggleButtonSXWidth = '90px';
export const ToggleButtonSMWidth = '150px';

export const primaryColorMain: string = colors.grey[900];
export const primaryColorLight: string = colors.grey[300];

const secondaryColorMain: string = colors.orange[700];
export const secondaryColorLight: string = colors.green[300];
export const colorDanger: string = colors.red[700];

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
            light: secondaryColorLight,
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
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    height: '55px',
                    backgroundColor: secondaryColorMain,
                    '&:hover': {
                        backgroundColor: primaryColorMain,
                    }
                }
            }
        }
    },
    typography: {
        h4: {
            margin:'auto',
            fontWeight:'lighter',
            paddingBottom:'0.5rem',
            color: primaryColorMain
        }
    }    
});

/**
 * Responsive.
 * Width for Formular.
 */
export const DivFormularAdmin = styled('div')(({ theme }) => ({
    display:'flex',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    margin: 'auto',
    flexDirection: 'column',
    [theme.breakpoints.up("xs")]: {
        width: '90%',
        
    },
    [theme.breakpoints.up("sm")]: {
        width: '560px',

    },
    [theme.breakpoints.up("md")]: {
        width: '850px'
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
        width:'49%'
    },


}));

/**
 * Signin and Signout icons.
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

export const ValidParagraph = styled('p')(({}) => ({
    lineHeight: '1.4rem',
    paddingLeft: '.2rem',
}));

/**
 * All Search Container have the same width.
 */
export const SearchContainer = styled('div')(({ theme }) => ({
    margin:'auto',
    borderRadius: '.3rem',
    marginTop: '4rem',
    paddingTop:'1rem',
    paddingBottom: '2rem',
    backgroundColor: 'whitesmoke',
    [theme.breakpoints.up("xs")]: {
        width: searchContainerXSWidth,
           
    },
    [theme.breakpoints.up("sm")]: {
        width: searchContainerXSWidth
    },
    [theme.breakpoints.up("md")]: {
        width: searchContainerMDWidth
    },
    [theme.breakpoints.up("lg")]: {
        width: searchContainerLGWidth
    }
}))

export default themeColor;