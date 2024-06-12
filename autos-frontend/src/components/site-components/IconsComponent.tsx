import { Grid, Typography } from '@mui/material'
import { Facebook, X, Instagram, LinkedIn, YouTube, Pinterest } from "@mui/icons-material";
import { COMPONENT_DISTANCE, LIGHT_PRIMARY_CONTRAST_TEXT } from '../../themes/Theme';
const gridXS = 12;
const gridSM = 6;
const gridLG = 3;
const gridItemStyle = { marginBottom: { xs: '3rem' } };
const iconStyle = { marginRight: '0.5rem', '@media screen': { fill: LIGHT_PRIMARY_CONTRAST_TEXT }, '@media print': { fill: 'black' } };

export default function IconsComponent() {
    
    const createHeaderForLinks = (header: string) => {
        return <Typography paddingBottom={COMPONENT_DISTANCE} key={header} variant="h5" component='h1' sx={{ '@media print': { color: 'black' }, color: LIGHT_PRIMARY_CONTRAST_TEXT }}>{header}</Typography>
      }
  
    return (
    <Grid item xs={gridXS} sm={gridSM} md={12} lg={gridLG} sx={gridItemStyle}>
          {
            createHeaderForLinks("Soziale Medien")
          }
          <Facebook sx={iconStyle} />
          <X sx={iconStyle} />
          <Instagram sx={iconStyle} />
          <LinkedIn sx={iconStyle} />
          <YouTube sx={iconStyle} />
          <Pinterest sx={iconStyle} />
        </Grid>
  )
}
