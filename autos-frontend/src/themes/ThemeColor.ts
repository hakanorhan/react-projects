import { colors, createTheme } from "@mui/material";
import { styled } from "@mui/material";

/*
    xs, extra-small: 0px
    sm, small: 600px
    md, medium: 900px
    lg, large: 1200px
    xl, extra-large: 1536px
*/

const textFieldXSWitdh = '90%';
export const textFieldSMWitdh = '560px';

const searchContainerXSWidth = '95%';
const searchContainerMDWidth = '95%';
const searchContainerLGWidth = '1075px';

export const ToggleButtonSXWidth = '90px';
export const ToggleButtonSMWidth = '150px';

const LIGHT_PRIMARY_COLOR_MAIN: string = "#2C5F2D";
const LIGHT_PRIMARY_COLOR_LIGHT: string = "#97BC62";
export const LIGHT_PRIMARY_CONTRAST_TEXT = '#FFFFFF';
const LIGHT_PRIMARY_DARK = "#E4E4DE";

const LIGHT_BACKGROUND_DEFAULT = '#FFFFFF';

const DARK_PRIMARY_COLOR_MAIN = colors.blueGrey[800];
const DARK_PRIMARY_COLOR_LIGHT = colors.grey[700];
const DARK_PRIMARY_COLOR_DARK = '#648dae';
const DARK_PRIMARY_CONTRAST_TEXT = '#FFFFFF';

const DARK_SECONDARY_COLOR_MAIN = colors.grey[700];
const DARK_SECONDARY_COLOR_LIGHT = '#ffa733';
const DARK_SECONDARY_COLOR_DARK = '#b26500';
const DARK_SECONDARY_CONTRAST_TEXT = '#FFFFFF';

export const COLOR_ON_WHITE_BACKGROUND = colors.grey[900];

export const colorDanger: string = colors.red[700];
export const buttonHeight = '55px';

export const minHeightContent = '750px';

export const mainComponentHeight = '750px';

export const paperElevationValue = 10;
export const paperMarginTopValue = '0.9rem';
export const paperPaddingValue = '0.7rem';
export const paddingPaperDetailSearch = '1rem';

export const paperViewDetailSearch = { marginTop: paperMarginTopValue };
export const paperViewDetailSearchTextArea = { width:'100%', marginTop: paperMarginTopValue };
export const LinkDrawer = { textDecoration: 'none' };

const components = {
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
                borderRadius: '0px',
                border: 'none',
                width: '100%',
                color: LIGHT_PRIMARY_CONTRAST_TEXT
                
            }
        },

    },
    MuiFab: {
        styleOverrides: {
            root: {
                backgroundColor: LIGHT_PRIMARY_COLOR_MAIN,
                color: LIGHT_PRIMARY_CONTRAST_TEXT,
                '&:hover': {
                    backgroundColor: LIGHT_PRIMARY_DARK
                }
            }
        }
    },
    MuiTypography: {
        styleOverrides: {
            root: {
                lineHeight: 1.5,
                letterSpacing: 0.12
            }
        }
    }, MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor:'transparent',
                color: LIGHT_PRIMARY_COLOR_MAIN,
                boxShadow: `0px 1px 0px 0px ${LIGHT_PRIMARY_COLOR_MAIN}`,
                
            }
        }
    }

};

const fontFamilies = {
    fontFamily:[
'Poppins',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  'Oxygen-Sans',
  'Ubuntu',
  'Cantarell',
  '"Helvetica Neue"',
  'sans-serif',
].join(',')
};

export const themeLight = createTheme({
    palette: {
        mode: 'light',
        text: {
            primary: colors.grey[900]
        },
        primary: {
            main: LIGHT_PRIMARY_COLOR_MAIN,
            contrastText: LIGHT_PRIMARY_CONTRAST_TEXT,
        }, secondary: {
            main: LIGHT_PRIMARY_COLOR_MAIN,
            contrastText: COLOR_ON_WHITE_BACKGROUND,
        }, background: {
            default: LIGHT_BACKGROUND_DEFAULT,
            paper: LIGHT_BACKGROUND_DEFAULT
        },
    }
    ,
    components: components,
    typography: fontFamilies
});

export const themeDark = createTheme({
    palette: {
        mode: 'dark',
        text: {
            primary: '#FFFFFF'
        },
        primary: {
            main: DARK_PRIMARY_COLOR_MAIN,
            contrastText: DARK_PRIMARY_CONTRAST_TEXT
        },
        secondary: {
            main: DARK_SECONDARY_COLOR_MAIN,
            contrastText: DARK_SECONDARY_CONTRAST_TEXT
        }, background: {
            default: colors.grey[900], 
            paper: colors.grey[900]
        },
    }
    ,
    components: components,
    typography: fontFamilies
});

export const headerSize = { color: LIGHT_PRIMARY_CONTRAST_TEXT, padding:'4.2rem', textAlign: 'center', fontWeight:'bold', fontSize: {xs: '2rem', sm:'2.5rem', md:'3rem', lg:'3.3rem'}};

export const MainBox = styled('div')(({ theme }) => ({
    width:'100%',
    backgroundColor: theme.palette.background.default

}));

/**
 * Responsive.
 * Width for Formular.
 */
export const MainComponentWidth = styled('div')(({ theme }) => ({
    display: 'flex',
    paddingTop: '1rem',
    paddingBottom: '3rem',
    margin: 'auto',
    flexDirection: 'column',
    [theme.breakpoints.up("xs")]: {
        width: '90%',

    },
    [theme.breakpoints.up("md")]: {
        width: '560px',

    }

}));

export const RegisterLoginWidth = styled('div')(({ theme }) => ({
    display: 'flex',
    paddingTop: '1rem',
    paddingBottom: '3rem',
    margin: 'auto',
    flexDirection: 'column',
    [theme.breakpoints.up("xs")]: {
        width: '90%',

    },
    [theme.breakpoints.up("sm")]: {
        width: '75%',

    },
    [theme.breakpoints.up("md")]: {
        width:'90%'
    },
    [theme.breakpoints.up("xl")]: {
        width:'610px'
    }

}));

/**
 * Responsive.
 * Width for Formular.
 */
export const DivSearchInserate = styled('div')(({ theme }) => ({
    display: 'flex',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    margin: 'auto',
    flexDirection: 'column',
    [theme.breakpoints.up("xs")]: {
        width: '95%',

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
        flexDirection: 'column'
    },
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
        width: '49%'
    },


}));

/**
 * Signin and Signout icons.
 */
export const HeaderIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    paddingBottom:'1rem',
    [theme.breakpoints.up("xs")]: {
        
        transform: 'scale(1.7)',
        marginBottom: '1rem'
    },
    [theme.breakpoints.up("sm")]: {
        transform: 'scale(2.4)'
    },

}));

export const HeaderInserateH1 = styled('h1')(({ theme }) => ({
    margin: 'auto',
    textAlign: 'center',
    color: 'secondary.contrastText',
    [theme.breakpoints.up("xs")]: {
        fontSize: '1.2rem'

    },
    [theme.breakpoints.up("lg")]: {
        fontSize: '1.9rem'

    },

}));

export const ValidParagraph = styled('p')(({ }) => ({
    lineHeight: '1.4rem',
    paddingLeft: '.2rem',
}));

/**
 * All Search Container have the same width.
 */
export const SearchContainer = styled('div')(({ theme }) => ({
    margin: 'auto',
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

export const ImgImageUpload = styled('img')(({ theme }) => ({
    width: '100%',
    objectFit: 'contain',
    height: '100%'
}))

export const ParagraphSideMenu = styled('p')(({ theme }) => ({
    marginLeft: '0.5rem',
    [theme.breakpoints.up("xs")]: {
    },
    [theme.breakpoints.up("sm")]: {
    },
    [theme.breakpoints.up("md")]: {
    },
    [theme.breakpoints.up("lg")]: {
    }
}))

export const SpanSideMenu = styled('span')(({ theme }) => ({

    [theme.breakpoints.up("xs")]: {
        display: 'none'
    },
    [theme.breakpoints.up("sm")]: {
    },
    [theme.breakpoints.up("md")]: {
    },
    [theme.breakpoints.up("lg")]: {
        display: 'block'
    }
}))

export const ImageCar = styled('img')(({ theme }) => ({
    width: '100%',
    objectFit: 'contain',
    padding: '0',
    margin: '0'
}))

export const DivViewDetail = styled('div')(({ theme }) => ({
    margin: 'auto',
    [theme.breakpoints.up("xs")]: {
        width: '95%',

    },
    [theme.breakpoints.up("sm")]: {
        width: searchContainerXSWidth
    },
    [theme.breakpoints.up("lg")]: {
        width: searchContainerLGWidth
    }
}))

export const DivContactBottom = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    position: 'fixed',
    bottom: 0, 
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.up("xs")]: {
        width:'100%'
    },
    [theme.breakpoints.up("sm")]: {
    },
    [theme.breakpoints.up("lg")]: {
    }
}))


export const ViewDetailIconStyle = { color: 'primary.main', fontSize: '3rem' };