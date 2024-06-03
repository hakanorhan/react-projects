import { Box, Typography, Grid } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from '@mui/icons-material/X';
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Link } from "react-router-dom";
import { COMPONENT_DISTANCE, LIGHT_PRIMARY_CONTRAST_TEXT, LinkDrawer } from "../../themes/Theme";
import DarkMode from "../DarkMode";
import { URLs } from "../../enums/URLs";

const gridItemStyle = { marginBottom: { xs: '3rem' } };
const iconStyle = { marginRight: '0.5rem', '@media screen': { fill: LIGHT_PRIMARY_CONTRAST_TEXT }, '@media print': { fill: 'black' } };

const gridXS = 12;
const gridSM = 6;
const gridMD = 4;
const gridLG = 3;

const COMPANY = [
  "Über cars.de",
  "Karriere",
  "Presse",
  "AGB",
  "Datenschutz",
  "Impressum"
];

const SERVICE = [
  "Kontakt",
  "Hilfe"
];

export default function Footer() {

  const CreateLink = (linkname: string, index: number, url: URLs = URLs.HOME_ALL_SEARCH_COUNT) => {
    return <Link key={index} style={LinkDrawer} to={url}> <Typography sx={{ '@media print': { color: 'black' }, color: LIGHT_PRIMARY_CONTRAST_TEXT }} key={index} > {linkname} </Typography> </Link>
  }

  const createHeaderForLinks = (header: string) => {
    return <Typography paddingBottom={COMPONENT_DISTANCE} key={header} variant="h5" component='h1' sx={{ '@media print': { color: 'black' }, color: LIGHT_PRIMARY_CONTRAST_TEXT }}>{header}</Typography>
  }

  return (
    <Box sx={{ backgroundColor: 'primary.main', '@media print': { breakBefore: 'page' } }}>
      <Grid sx={{ margin: 'auto', padding: '2rem', paddingTop: '3rem' }} container item xs={12} md={11}>
        <Grid item xs={gridXS} sm={gridSM} md={gridMD} lg={gridLG} sx={gridItemStyle}>
          {
            createHeaderForLinks("Unternehmen")
          }

          {
            COMPANY.map((links, index) => (
              CreateLink(links, index)
            ))
          }
        </Grid>
        <Grid item xs={gridXS} sm={gridSM} md={gridMD} lg={gridLG} sx={gridItemStyle}>
          {
            createHeaderForLinks("Service")
          }
          {
            SERVICE.map((links, index) => (
              CreateLink(links, index)
            ))
          }
        </Grid>
        <Grid item xs={gridXS} sm={gridSM} md={gridMD} lg={gridLG} sx={gridItemStyle}>
          {
            createHeaderForLinks("Händler / Privat")
          }
          {
            CreateLink("Anmelden", 0, URLs.POST_SIGNIN)
          }
          {
            CreateLink("Registrieren", 1, URLs.POST_SIGINUP)
          }
        </Grid>

        <Grid item xs={gridXS} sm={gridSM} md={12} lg={gridLG} sx={gridItemStyle}>
          {
            createHeaderForLinks("Soziale Medien")
          }
          <FacebookIcon sx={iconStyle} />
          <XIcon sx={iconStyle} />
          <InstagramIcon sx={iconStyle} />
          <LinkedInIcon sx={iconStyle} />
          <YouTubeIcon sx={iconStyle} />
          <PinterestIcon sx={iconStyle} />
        </Grid>

        <Grid>
          <DarkMode />
        </Grid>
      </Grid>
    </Box>
  )
}
