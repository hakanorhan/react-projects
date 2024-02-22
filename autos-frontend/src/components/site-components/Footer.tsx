import {
  Box,
  Container,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CopyrightIcon from "@mui/icons-material/Copyright";
import PinterestIcon from "@mui/icons-material/Pinterest";
import * as ThemeColor from '../../themes/ThemeColor';

const socialAccountIcon: string = 'white';

export default function Footer() {
  return (
    <Box sx={{ height:'300px', backgroundColor: ThemeColor.primaryColorMain}}>
      <Box display={"flex"} paddingTop={"1rem"} paddingBottom={"3rem"} paddingLeft={"1rem"}>
        <FacebookIcon style={{ fill: socialAccountIcon, marginRight: "0.5rem" }} />
        <TwitterIcon style={{ fill: socialAccountIcon, marginRight: "0.5rem" }} />
        <InstagramIcon style={{ fill: socialAccountIcon, marginRight: "0.5rem" }} />
        <LinkedInIcon style={{ fill: socialAccountIcon, marginRight: "0.5rem" }} />
        <YouTubeIcon style={{ fill: socialAccountIcon, marginRight: "0.5rem" }} />
        <PinterestIcon style={{ fill: socialAccountIcon }} />
      </Box>
      <p style={{ color: "whitesmoke", paddingBottom: "1rem", paddingLeft:'1rem' }}>
        <CopyrightIcon style={{ fill: "white" }} />{" "}
        Copyright 2024 Hakan Orhan. Alle Rechte vorbehalten
      </p>
    </Box>
  )
}
