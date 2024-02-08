import { colors, createTheme } from "@mui/material";

const themeColor = createTheme({
    palette: {
        primary: {
            main: colors.grey[900],
            light: colors.grey[700]
        },
        secondary: {
            main: colors.red[500],
        }
    }
});

export default themeColor;