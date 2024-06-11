import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { URLs } from "../../constants/values";
import { scrollToTop } from "../../helper/helper";

export default function Notfound() {

  scrollToTop();

  return (
    <Box sx={{ display:'column', backgroundColor:'primary.main', height: '100vh' }}>
      <Typography color={'primary.contrastText'} paddingTop={'20%'} align="center" variant={'h4'} component={'p'}>{"Seite nicht gefunden"}</Typography>
      <Box textAlign={'center'}><Link style={{ textDecoration:'none' }} to={URLs.HOME_ALL_SEARCH_COUNT}><Typography color={'primary.contrastText'} variant="h2">{"Zur Homeseite"}</Typography></Link></Box>
    </Box>
  )
}
