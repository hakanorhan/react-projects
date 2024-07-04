import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Facebook from '@mui/icons-material/Facebook';
import X from '@mui/icons-material/X';
import Instagram from '@mui/icons-material/Instagram';
import LinkedIn from '@mui/icons-material/LinkedIn';
import YouTube from '@mui/icons-material/YouTube';
import Pinterest from '@mui/icons-material/Pinterest';
import { COMPONENT_DISTANCE} from '../../themes/Theme';
const gridXS = 12;
const gridSM = 6;
const gridLG = 3;
const gridItemStyle = { marginBottom: { xs: '3rem' } };
const iconStyle = { marginRight: '0.5rem', '@media screen': { color: 'primary.contrastText' }, '@media print': { fill: 'black' } };

export default function IconsComponent() {
    
    const createHeaderForLinks = (header: string) => {
        return <Typography paddingBottom={COMPONENT_DISTANCE} key={header} variant="h5" component='h1' sx={{ '@media print': { color: 'black' }, color: 'primary.contrastText' }}>{header}</Typography>
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
