import { Box, Switch, FormControlLabel, Typography } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from '@mui/icons-material/X';
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CopyrightIcon from "@mui/icons-material/Copyright";
import PinterestIcon from "@mui/icons-material/Pinterest";

const socialAccountIcon: string = 'white';


export default function Footer() {


  return (
    <Box sx={{ backgroundColor:'primary.main', height:'300px' }}>
      <Box display={"flex"} paddingTop={"1rem"} paddingBottom={"3rem"} paddingLeft={"1rem"}>
        <FacebookIcon style={{ fill: socialAccountIcon, marginRight: "0.5rem" }} />
        <XIcon style={{ fill: socialAccountIcon, marginRight: "0.5rem" }} />
        <InstagramIcon style={{ fill: socialAccountIcon, marginRight: "0.5rem" }} />
        <LinkedInIcon style={{ fill: socialAccountIcon, marginRight: "0.5rem" }} />
        <YouTubeIcon style={{ fill: socialAccountIcon, marginRight: "0.5rem" }} />
        <PinterestIcon style={{ fill: socialAccountIcon }} />
      </Box>
      <Typography variant='body1' component='details' sx={{ color:'background.paper', paddingBottom: "1rem", paddingLeft:'1rem' }}>
        <CopyrightIcon style={{ fill: "white" }} />{" "}
        Copyright 2024 Hakan Orhan. Alle Rechte vorbehalten
      </Typography>
      
    </Box>
  )
}
