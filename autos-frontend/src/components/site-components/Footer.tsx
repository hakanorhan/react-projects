import { Box, Switch, FormControlLabel, Typography, Grid } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from '@mui/icons-material/X';
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CopyrightIcon from "@mui/icons-material/Copyright";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Link } from "react-router-dom";
import { LinkDrawer } from "../../themes/ThemeColor";
import DarkMode from "../DarkMode";

const gridItemStyle = { marginBottom: { xs: '3rem' } };
const iconStyle = { fill: 'secondary.contrastText', marginRight:'0.5rem' };

const gridXS = 12;
const gridSM = 6;
const gridMD = 4;
const gridLG = 3;

export default function Footer() {


  return (
    <Box sx={{ backgroundColor:'primary.main' }}>
      <Grid sx={{ margin:'auto', padding:'2rem', paddingTop:'3rem'  }} container item xs={ 12 } md={ 11 }>
        <Grid item xs={ gridXS } sm={ gridSM } md={ gridMD } lg= { gridLG } sx={ gridItemStyle }>
          <Typography variant='h6' component='h1'>{'Unternehmen'}</Typography>
          <Link style={ LinkDrawer } to={""}> <Typography sx={{ color: 'secondary.contrastText' }} >Über cars.de</Typography> </Link>
          <Link style={ LinkDrawer } to={""}> <Typography sx={{ color: 'secondary.contrastText' }} >Karriere</Typography> </Link>
          <Link style={ LinkDrawer } to={""}> <Typography sx={{ color: 'secondary.contrastText' }} >Presse</Typography> </Link>
          <Link style={ LinkDrawer } to={""}> <Typography sx={{ color: 'secondary.contrastText' }} >AGB</Typography> </Link>
          <Link style={ LinkDrawer } to={""}> <Typography sx={{ color: 'secondary.contrastText' }} >Datenschutz</Typography> </Link>
          <Link style={ LinkDrawer } to={""}> <Typography sx={{ color: 'secondary.contrastText' }} >Impressum</Typography> </Link>
        </Grid>
        <Grid item xs={ gridXS } sm={ gridSM } md={ gridMD } lg={ gridLG } sx={ gridItemStyle }>
          <Typography variant='h6' component='h1'>{'Service'}</Typography>
          <Link style={ LinkDrawer } to={""}> <Typography sx={{ color: 'secondary.contrastText' }} >Kontakt</Typography> </Link>
          <Link style={ LinkDrawer } to={""}> <Typography sx={{ color: 'secondary.contrastText' }} >Hilfe</Typography> </Link>
        </Grid>
        <Grid item xs={ gridXS } sm={ gridSM } md={ gridMD } lg={ gridLG } sx={ gridItemStyle }>
          <Typography variant='h6' component='h1'>{'Händler / Privat'}</Typography>
          <Link style={ LinkDrawer } to={""}> <Typography sx={{ color: 'secondary.contrastText' }} >Anmelden</Typography> </Link>
          <Link style={ LinkDrawer } to={""}> <Typography sx={{ color: 'secondary.contrastText' }} >Registrieren</Typography> </Link>
        </Grid>

        <Grid item xs = { gridXS } sm={ gridSM } md={ 12 } lg={ gridLG } sx={ gridItemStyle }>
          <Typography variant='h6' component='h1'>{"Soziale Medien"}</Typography>
          <FacebookIcon sx={ iconStyle } />
        <XIcon sx={ iconStyle } />
        <InstagramIcon sx={ iconStyle } />
        <LinkedInIcon sx={ iconStyle } />
        <YouTubeIcon sx={ iconStyle } />
        <PinterestIcon sx={ iconStyle }/>
        </Grid>
        
      <Grid>
        <DarkMode />
      </Grid>
      </Grid>
    </Box>
  )
}
