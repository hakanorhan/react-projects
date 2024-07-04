import { Components, PaletteMode, Theme, colors, createTheme } from "@mui/material";
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

/**
 * Breakpoints.
 */
const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 1100,
    xl: 1500,
    
};

export const XS_MAX_WIDTH_430 = '(max-width:429px)';

const searchContainerXSWidth = '95%';
const searchContainerMDWidth = '95%';
const searchContainerLGWidth = '1050px';
const searchContainerXLWidth = '1150px'

export const ToggleButtonSXWidth = '90px';
export const ToggleButtonSMWidth = '150px';

const LIGHT_PRIMARY_COLOR_MAIN: string = "#D48166";
const LIGHT_PRIMARY_CONTRAST_TEXT = '#FFFFFF';

const LIGHT_SECONDARY_COLOR_MAIN = "#373A36";
const LIGHT_BACKGROUND_DEFAULT = 'whitesmoke';
const LIGHT_BACKGROUND_PAPER_DEFAULT = 'white';

const DARK_PRIMARY_COLOR_MAIN = '#008080'
const DARK_PRIMARY_CONTRAST_TEXT = '#FFFFFF';
const DARK_SECONDARY_COLOR_MAIN = '#00A8C9';
const DARK_BACKGROUND_DEFAULT = '#36454F';
const DARK_BACKGROUND_PAPER_DEFAULT = colors.grey[700];
// text on default background
const LIGHT_TEXT_PRIMARY = colors.grey[900];

const DARK_TEXT_PRIMARY = '#ffffff';

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

const typographySizes = (textPrimary: string) => ( {
    h1: {fontSize: '2.5rem', color: textPrimary},
    h2: {fontSize:'2rem', color: textPrimary},
    h3: {fontSize: '1.75rem', color: textPrimary},
    h4: {fontSize: '1.5rem', color: textPrimary},
    h5:{fontSize:'1.25rem', color: textPrimary},
    h6: {fontSize: '1rem', color: textPrimary},
    body1: { fontSize: '1rem', color: textPrimary},
    body2: { fontSize: '0.9rem', color: textPrimary}
});

const componentStyles= (primaryMain: string, secondaryMain: string, paperBackgroundColor: string, primaryContrastText: string): Components<Omit<Theme, 'components'>> => ({
     MuiPaper: {
        styleOverrides: {
            root: {
                backgroundColor: paperBackgroundColor,
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
                backgroundColor: primaryMain,
                color: primaryContrastText,
                marginBottom: '1rem',
                '@media (hover: hover)': {
                    '&:hover': {
                      backgroundColor: secondaryMain,
                      color: primaryContrastText,
                      cursor: 'pointer',
                    },
                textTransform: 'none',
                '& .MuiButton-label': {
                    textTransform: 'capitalize',
                },
          } }
        },

    },
    MuiFab: {
        styleOverrides: {
            root: {
                backgroundColor: primaryMain,
                color: primaryContrastText,
                '&:hover': {
                    backgroundColor: secondaryMain
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
    },
});

const themeStyles = (textPrimary: string, mode: PaletteMode, primaryMain: string, secondaryMain: string, backgroundDefaultColor: string, paperBackgroundColor: string, primaryContrastText: string ) => ({
    palette: {
        mode: mode,
        text: {
            primary: textPrimary,
        },
        primary: {
            main: primaryMain,
            contrastText: primaryContrastText,
        }, secondary: {
            main: secondaryMain,
            contrastText: primaryContrastText,
        }, background: {
            default: backgroundDefaultColor,
            paper: paperBackgroundColor,
        }, icon: {
            main: textPrimary
        }, success: {
            main: '#4caf50'
        }, danger: {
            main: '#f44336'
        }
    },
    typography: typographySizes(textPrimary),
    components: componentStyles(primaryMain, secondaryMain, paperBackgroundColor, primaryContrastText),
    breakpoints: { values: breakpoints }
});

export const themeLight = createTheme({
    ...themeStyles(
        LIGHT_TEXT_PRIMARY,
        'light' as PaletteMode,
        LIGHT_PRIMARY_COLOR_MAIN,
        LIGHT_SECONDARY_COLOR_MAIN,
        LIGHT_BACKGROUND_DEFAULT,
        LIGHT_BACKGROUND_PAPER_DEFAULT,
        LIGHT_PRIMARY_CONTRAST_TEXT
    )
});

export const themeDark = createTheme({
    ...themeStyles(
        DARK_TEXT_PRIMARY,
        'dark' as PaletteMode,
        DARK_PRIMARY_COLOR_MAIN,
        DARK_SECONDARY_COLOR_MAIN,
        DARK_BACKGROUND_DEFAULT,
        DARK_BACKGROUND_PAPER_DEFAULT,
        DARK_PRIMARY_CONTRAST_TEXT
    )
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
    minHeight: '300px',
    [theme.breakpoints.up("xs")]: {
        width: '90%',

    },
    [theme.breakpoints.up("md")]: {
        width: '690px'

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