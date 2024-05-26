import { Box, Typography, Grid } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from '@mui/icons-material/X';
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Link } from "react-router-dom";
import { LIGHT_PRIMARY_CONTRAST_TEXT, LinkDrawer } from "../../themes/Theme";
import DarkMode from "../DarkMode";

const gridItemStyle = { marginBottom: { xs: '3rem' } };
const iconStyle = { marginRight: '0.5rem', fill: LIGHT_PRIMARY_CONTRAST_TEXT };

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

const PRIVATE_DEALER = [
  "Anmelden",
  "Registrieren"
]

export default function Footer() {

  const CreateLink = (linkname: string, index: number) => {
    return <Link key={index} style={LinkDrawer} to={""}> <Typography sx={{ color: LIGHT_PRIMARY_CONTRAST_TEXT }} key={index} > {linkname} </Typography> </Link>
  }

  const createHeaderForLinks = (header: string) => {
    return <Typography key={header} variant="h5" component='h1' sx={{ color: LIGHT_PRIMARY_CONTRAST_TEXT }}>{header}</Typography>
  }

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
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
            PRIVATE_DEALER.map((links, index) => (
              CreateLink(links, index)
            ))
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
