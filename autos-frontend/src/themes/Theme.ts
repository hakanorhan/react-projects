import { Select, colors, createTheme } from "@mui/material";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";

const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 1100,
    xl: 1200,
    xxl: 1400
};

export const BREAKPOINT_MIN_LG = 1101;

export const textFieldSMWitdh = '560px';

const searchContainerXSWidth = '95%';
const searchContainerMDWidth = '95%';
const searchContainerLGWidth = '1050px';
const searchContainerXLWidth = '1150px'

export const ToggleButtonSXWidth = '90px';
export const ToggleButtonSMWidth = '150px';

const LIGHT_PRIMARY_COLOR_MAIN: string = "#7a63f1";
export const LIGHT_PRIMARY_CONTRAST_TEXT = '#FFFFFF';

//const LIGHT_PRIMARY_DARK = "#E4E4DE";

export const LIGHT_SECONDARY_COLOR_MAIN = "#ebe8fc";
const LIGHT_BACKGROUND_DEFAULT = 'white';
const LIGHT_BACKGROUND_PAPER_DEFAULT = '#FFFFFF';

const DARK_PRIMARY_COLOR_MAIN = colors.cyan[600];
const DARK_PRIMARY_CONTRAST_TEXT = '#FFFFFF';

const DARK_SECONDARY_COLOR_MAIN = colors.grey[900];
const DARK_SECONDARY_CONTRAST_TEXT = '#FFFFFF';
const DARK_PRIMARY_LIGHT = colors.grey[900];

export const colorDanger: string = colors.red[700];
export const buttonHeight = '55px';

export const minHeightContent = '750px';
export const mainComponentHeight = '750px';

export const paperElevationValue = 10;
export const paperMarginTopValue = '0.9rem';
export const paperPaddingValue = '0.7rem';
export const paddingPaperDetailSearch = '1rem';

export const paperViewDetailSearch = { marginTop: paperMarginTopValue };
export const paperViewDetailSearchTextArea = { width: '100%', marginTop: paperMarginTopValue };
export const LinkDrawer = { textDecoration: 'none' };

export const paperFontSize = { xs: '1.1rem', sm: '1.3rem', md: '1rem', lg: '1.2rem' };
export const ICON_FONT_SIZE = '1.4rem';

export const TRANSITION = '1S';
export const ZOOM_HOVER = { transition: TRANSITION, '&:hover': { transform: 'scale(1.01)' }, cursor: 'pointer', height: '100%' };

export const SX_ICON = { fontSize: ICON_FONT_SIZE, color: 'text.primary' };

const components = {

    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundColor: 'whitesmoke',
                '&:hover': {

                }
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
                borderRadius: '0px',
                border: 'none',
                width: '100%',
                color: LIGHT_PRIMARY_CONTRAST_TEXT,
                '&:hover': {
                    backgroundColor: LIGHT_SECONDARY_COLOR_MAIN,
                    color: LIGHT_PRIMARY_COLOR_MAIN,
                    transition: TRANSITION
                }
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

    }
};

const componentsDark = {

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
                color: DARK_PRIMARY_CONTRAST_TEXT,
                '&:hover': {
                    backgroundColor: DARK_SECONDARY_COLOR_MAIN,
                    color: DARK_PRIMARY_COLOR_MAIN,
                    transition: TRANSITION
                }
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

};

export const fontRegular = 'TitilliumWeb-Regular';
export const fontBold = 'TitilliumWeb-Bold';
export const fontExtraLight = 'TitilliumWeb-Extra-Light';
export const fontLight = 'TitilliumWeb-Light';
export const fontSemiBold = 'TitilliumWeb-SemiBold';

const fontFamilies = {
    fontFamily: [
        fontExtraLight,
        fontLight,
        fontRegular,
        fontSemiBold,
        fontBold,
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'Oxygen-Sans',
        'Ubuntu',
        'Cantarell',
        '"Helvetica Neue"',
        'sans-serif',
        'Poppins-Extra-Light',
        'Poppins-Bold',
        'Poppins-Semi-Bold',
        'Poppins-Medium',
        'Poppins-Thin',
    ].join(',')
};

export const themeLight = createTheme({
    palette: {
        mode: 'light',
        text: {
            primary: '#434344',
            secondary: colors.grey[600]
        },
        primary: {
            main: LIGHT_PRIMARY_COLOR_MAIN,
            contrastText: LIGHT_PRIMARY_CONTRAST_TEXT,
        }, secondary: {
            main: LIGHT_SECONDARY_COLOR_MAIN,
            contrastText: LIGHT_PRIMARY_COLOR_MAIN,
        }, background: {
            default: LIGHT_BACKGROUND_DEFAULT,
            paper: LIGHT_BACKGROUND_PAPER_DEFAULT
        },
    }
    ,
    components: components,
    typography: fontFamilies,
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
    }
    ,
    components: componentsDark,
    typography: fontFamilies,
    breakpoints: { values: breakpoints }
});

export const headerSize = { color: 'black', textAlign: 'center', fontFamily: fontBold, backgroundColor: 'white', opacity: '70%', padding: '1.5rem', marginBottom: '2rem' };

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
    [theme.breakpoints.up("md")]: {
        width: '750px'
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
    color: theme.palette.primary.main,
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