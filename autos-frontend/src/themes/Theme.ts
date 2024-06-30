import { colors, createTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import Select from "@mui/material/Select";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";

declare module '@mui/material/styles' {
    interface Palette {
        icon: {
            main: string;
        };
    }
    interface PaletteOptions {
        icon?: {
            main?: string;
        };
    }
}

const breakpoints = {
    xs: 0,
    sm: 430,
    md: 768,
    lg: 1100,
    xl: 1500,
    
};

export const BREAKPOINT_MIN_LG = 1101;

export const textFieldSMWitdh = '560px';

const searchContainerXSWidth = '95%';
const searchContainerMDWidth = '95%';
const searchContainerLGWidth = '1050px';
const searchContainerXLWidth = '1150px'

export const ToggleButtonSXWidth = '90px';
export const ToggleButtonSMWidth = '150px';

const LIGHT_PRIMARY_COLOR_MAIN: string = "#2B2B4D";
const LIGHT_PRIMARY_COLOR_LIGHT: string = "#02c9ff";
export const LIGHT_PRIMARY_CONTRAST_TEXT = '#FFFFFF';

//const LIGHT_PRIMARY_DARK = "#E4E4DE";

export const LIGHT_SECONDARY_COLOR_MAIN = "#4740ed";
const LIGHT_BACKGROUND_DEFAULT = 'whitesmoke';
const LIGHT_BACKGROUND_PAPER_DEFAULT = 'white';

const DARK_PRIMARY_COLOR_MAIN = colors.cyan[600];
const DARK_PRIMARY_CONTRAST_TEXT = '#FFFFFF';

const DARK_SECONDARY_COLOR_MAIN = colors.grey[900];
const DARK_SECONDARY_CONTRAST_TEXT = '#FFFFFF';
const DARK_PRIMARY_LIGHT = colors.grey[900];

export const colorDanger: string = colors.red[700];
export const buttonHeight = '55px';

export const minHeightContent = '97vh';
export const mainComponentHeight = '97vh';

export const paperElevationValue = 10;
export const paperMarginTopValue = '0.9rem';
export const paperPaddingValue = '0.7rem';
export const paddingPaperDetailSearch = '1rem';

export const paperViewDetailSearch = { marginTop: paperMarginTopValue };
export const paperViewDetailSearchTextArea = { width: '100%', marginTop: paperMarginTopValue };
export const LinkDrawer = { textDecoration: 'none' };

export const paperFontSize = { xs: '1.1rem', sm: '1.3rem', md: '1rem', lg: '1.2rem' };
export const ICON_FONT_SIZE = '1.4rem';

export const ZOOM_HOVER = { '&:hover': { transform: 'scale(1.01)' }, cursor: 'pointer', height: '100%' };

export const SX_ICON = { fontSize: ICON_FONT_SIZE, color: 'text.primary' };
export const PAPER_ELEVATION_VALUE = 9;

const typographySizes =  {
    h1: {fontSize: '2.5rem'},
    h2: {fontSize:'2rem'},
    h3: {fontSize: '1.75rem'},
    h4: {fontSize: '1.5rem'},
    h5:{fontSize:'1.25rem'},
    h6: {fontSize: '1rem'},
    body1: {fontSize: '1rem'}
};

export const themeLight = createTheme({
    palette: {
        mode: 'light',
        text: {
            primary: colors.grey[900],
            secondary: colors.grey[600]
        },
        primary: {
            main: LIGHT_PRIMARY_COLOR_MAIN,
            light: LIGHT_PRIMARY_COLOR_LIGHT,
            contrastText: LIGHT_PRIMARY_CONTRAST_TEXT,
        }, secondary: {
            main: LIGHT_SECONDARY_COLOR_MAIN,
            contrastText: LIGHT_PRIMARY_COLOR_MAIN,
        }, background: {
            default: LIGHT_BACKGROUND_DEFAULT,
            paper: LIGHT_BACKGROUND_PAPER_DEFAULT,
        }, icon: {
            main: LIGHT_PRIMARY_COLOR_LIGHT
        }
    },
    typography: typographySizes,
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: 'whitesmoke',

                }
            }
        },

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
                    fontSize: '1.2rem',
                    borderRadius: '0px',
                    border: 'none',
                    width: '100%',
                    backgroundColor: LIGHT_SECONDARY_COLOR_MAIN,
                    color: LIGHT_PRIMARY_CONTRAST_TEXT,
                    marginBottom: '1rem',
                    '&:hover': {
                        backgroundColor: LIGHT_PRIMARY_COLOR_LIGHT,
                        color: LIGHT_PRIMARY_CONTRAST_TEXT,
                    }, textTransform: 'none',
                    '& .MuiButton-label': {
                        textTransform: 'capitalize',
                    },
                }
            },

        },
        MuiFab: {
            styleOverrides: {
                root: {
                    backgroundColor: LIGHT_PRIMARY_COLOR_MAIN,
                    color: LIGHT_PRIMARY_CONTRAST_TEXT,
                    '&:hover': {
                        backgroundColor: 'white'
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
        }, MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: LIGHT_PRIMARY_COLOR_MAIN
                }
            }
        }
    },
    breakpoints: { values: breakpoints }
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
            default: 'black',
            paper: colors.grey[900]
        },
    },
    typography: typographySizes,
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
                    fontSize: '1.2rem',
                    borderRadius: '0px',
                    border: 'none',
                    width: '100%',
                    color: DARK_PRIMARY_CONTRAST_TEXT,
                    '&:hover': {
                        backgroundColor: DARK_SECONDARY_COLOR_MAIN,
                        color: DARK_PRIMARY_COLOR_MAIN,
                    },
                    textTransform: 'none',
                    '& .MuiButton-label': {
                        textTransform: 'capitalize',
                    },
                }
            },
    
        },
    
        MuiFab: {
            styleOverrides: {
                root: {
                    backgroundColor: DARK_PRIMARY_COLOR_MAIN,
                    color: DARK_PRIMARY_CONTRAST_TEXT,
                    '&:hover': {
                        backgroundColor: DARK_PRIMARY_COLOR_MAIN
                    }
                }
            }
        },
    
        MuiTypography: {
            styleOverrides: {
                root: {
                    lineHeight: 1.5,
                    letterSpacing: 0.12,
                    color: 'white'
                }
            }
    
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&:-webkit-autofill': {
                        WebkitBoxShadow: `0 0 0 1000px ${DARK_PRIMARY_LIGHT} inset`,
                        WebkitTextFillColor: DARK_PRIMARY_CONTRAST_TEXT,
                    }
                    ,
                    '&:-webkit-autofill:focus': {
                        WebkitBoxShadow: `0 0 0 1000px ${DARK_PRIMARY_LIGHT} inset`,
                        WebkitTextFillColor: DARK_PRIMARY_CONTRAST_TEXT,
                    },
                    '&:-webkit-autofill:hover': {
                        WebkitBoxShadow: `0 0 0 1000px ${DARK_PRIMARY_LIGHT} inset`,
                        WebkitTextFillColor: DARK_PRIMARY_CONTRAST_TEXT,
                    },
                    '&:-webkit-autofill:active': {
                        WebkitBoxShadow: `0 0 0 1000px ${DARK_PRIMARY_LIGHT} inset`,
                        WebkitTextFillColor: DARK_PRIMARY_CONTRAST_TEXT,
                    },
                }
            }
        }
    },
    breakpoints: { values: breakpoints }
});

export const MainBox = styled('div')(({ theme }) => ({
    paddingTop: COMPONENT_DISTANCE,
    width: '100%',
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
    minHeight: '100vh',
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
        width: '90%'
    },
    [theme.breakpoints.up("xl")]: {
        width: '610px'
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

export const Boxprint = styled('div')(({ }) => ({
    '@media print': {
        display: 'none',
    },
    '@media screen': {
        display: 'block',
    },
}));

/**
 * Signin and Signout icons.
 */
export const HeaderIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    textAlign: 'center',

    paddingBottom: '1rem',
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
    },
    [theme.breakpoints.up("xl")]: {
        width: searchContainerXLWidth
    }
}))

export const ImgImageUpload = styled('img')(({ }) => ({
    width: '100%',
    height: '100%'
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

export const ImageCar = styled('img')(({ }) => ({
    width: '100%',
    padding: '0',
    margin: '0',
    objectPosition: 'center',
    aspectRatio: 16 / 9,
    objectFit: 'cover'
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
    padding: COMPONENT_DISTANCE,

    [theme.breakpoints.up("xs")]: {
        width: '100%',
        display: 'block'
    },
    [theme.breakpoints.up("md")]: {
        display: 'none'
    }
}))

export const COMPONENT_DISTANCE = "1rem";
export const LINE_HEIGHT = "0.3rem";
export const GreyHorizontalHR = styled('hr')(({ }) => ({
    border: 'none',
    borderTop: `1px solid ${colors.grey[300]}`,

}));

export const GreyVerticalHR = styled('hr')(({ }) => ({
    border: 'none',
    borderLeft: `1px solid ${colors.grey[200]}`,
    height: '100%',
    width: '1px',
    margin: 0,
    padding: 0,
    display: 'inline-block',
}));

export const GreyHorizontalTechBoldHR = styled('hr')(({ theme }) => ({
    border: 'none',
    borderTop: `1px solid ${colors.grey[300]}`,
    [theme.breakpoints.up('xs')]: {
        display: 'block'
    },
    [theme.breakpoints.up('lg')]: {
        display: 'none'
    }
}));

export const GreyHorizontalBoldHR = styled('hr')(({ }) => ({
    border: 'none',
    borderTop: `1px solid ${colors.grey[300]}`,

}));

export const GreyVerticalBoldHR = styled('hr')(({ }) => ({
    border: 'none',
    borderLeft: `1px solid ${colors.grey[200]}`,
    height: '100%',
    width: '1px',
    margin: 0,
    padding: 0,
    display: 'inline-block',
}));

export const LinkHome = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    textDecoration: 'none'

}));

export const LinkNewSearch = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'none'

}));

export const CustomSelect = styled(Select)(({ }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
}));

export const ViewDetailIconStyle = { color: 'primary.main', fontSize: '3rem' };

export const H1PrimaryMain = styled('h1') ({
    
    color: 'white',
    margin: 'auto',
    textAlign: 'center',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    transition: 'opacity 0.5s ease-in-out',
    fontSize: '36px'
});


export const AccordionLazy = styled(Accordion)(() => ({
    backgroundColor:'secondary.main',
    paddingLeft: '35px',
    marginBottom: '0.8rem' ,
    elevation: 0
}))