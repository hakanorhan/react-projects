import { Components, PaletteMode, Theme, colors, createTheme } from "@mui/material";
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
    lg: 1150,
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
export const COMPONENT_DISTANCE = "1rem";
export const LINE_HEIGHT = "0.3rem";

export const paperElevationValue = 10;
export const paperMarginTopValue = '0.9rem';
export const paperPaddingValue = '0.7rem';
export const paddingPaperDetailSearch = '1rem';

export const paperViewDetailSearch = { marginTop: paperMarginTopValue };
export const paperViewDetailSearchTextArea = { width: '100%', marginTop: paperMarginTopValue, marginBottom: COMPONENT_DISTANCE };
export const LinkDrawer = { textDecoration: 'none' };

export const paperFontSize = { xs: '1.1rem', sm: '1.3rem', md: '1rem', lg: '1.2rem' };
export const ICON_FONT_SIZE = '1.4rem';

export const ZOOM_HOVER = { '&:hover': { transform: 'scale(1.01)' }, cursor: 'pointer', height: '100%' };

export const SX_ICON = { fontSize: ICON_FONT_SIZE, color: 'text.primary',  '@media print': {
    color: '#000000',
  }, };
export const PAPER_ELEVATION_VALUE = 9;

const typographySizes = (textPrimary: string) => ({
    h1: {
        fontSize: '2.5rem', color: textPrimary, '@media print': {
            color: 'black',
        },
    },
    h2: {
        fontSize: '2rem', color: textPrimary, '@media print': {
            color: 'black',
        },
    },
    h3: {
        fontSize: '1.75rem', color: textPrimary, '@media print': {
            color: 'black',
        },
    },
    h4: {
        fontSize: '1.5rem', color: textPrimary, '@media print': {
            color: 'black',
        },
    },
    h5: {
        fontSize: '1.25rem', color: textPrimary, '@media print': {
            color: 'black',
        },
    },
    h6: {
        fontSize: '1rem', color: textPrimary, '@media print': {
            color: 'black',
        },
    },
    body1: {
        fontSize: '1rem', color: textPrimary, '@media print': {
            color: 'black',
        },
    },
    body2: {
        fontSize: '0.9rem', color: textPrimary, '@media print': {
            color: 'black',
        },
    }
});

const componentStyles = (primaryMain: string, secondaryMain: string, paperBackgroundColor: string, primaryContrastText: string): Components<Omit<Theme, 'components'>> => ({
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
                }
            }
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

const themeStyles = (textPrimary: string, mode: PaletteMode, primaryMain: string, secondaryMain: string, backgroundDefaultColor: string, paperBackgroundColor: string, primaryContrastText: string) => ({
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
            main: textPrimary,
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

/**
 * Light mode.
 */
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

/**
 * Dark mode.
 */
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

/**
 * Responsive.
 * Width for Formular.
 * Used in InsertBrand.tsx, InsertModel.tsx, SignIn.tsx, SignUp.tsx
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


export const Boxprint = styled('div')(({ }) => ({
    '@media print': {
        display: 'none',
    },
    '@media screen': {
        display: 'block',
    },
}));

/**
 * used in Inserate car.
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

/**
 * Used in PublishInserate.tsx
 */
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

/**
 * Used in LinkSearchedCars.tsx
 */
export const LinkNewSearch = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'none'

}));