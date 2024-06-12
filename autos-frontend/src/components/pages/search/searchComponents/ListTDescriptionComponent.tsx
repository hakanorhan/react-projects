import { Box, Grid, Rating, Typography } from '@mui/material'
import React from 'react'
import { LINE_HEIGHT, ICON_FONT_SIZE } from '../../../../themes/Theme'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SpeedIcon from '@mui/icons-material/Speed';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import { seperateThousand } from '../../../../helper/helper';
import { AxiosPaper } from '../../../../interfaces/IAxiosData';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface GridComponentProps {
  icon: JSX.Element,
  value: any
}

const gridItemXS = 4;
const gridItemSM = 4;
const gridItemMD = 6;

export const ListTDescriptionComponent: React.FC<{ detailSearchValues: AxiosPaper }> = ({ detailSearchValues }) => {
  
  const GridComponent: React.FC<GridComponentProps> = ({ icon, value }) => {
    return <Grid item><Box sx={{ display: 'flex', justifyContent:'left', marginBottom: LINE_HEIGHT }}> {icon}  <Typography sx={{ marginLeft: '.5rem', whiteSpace: 'nowrap' }} variant='body1' component='p'>{value}</Typography></Box></Grid>
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={gridItemXS} sm={gridItemSM} md={ gridItemMD}>
          <Rating sx={{ color:'primary.main', verticalAlign: 'middle', fontSize: ICON_FONT_SIZE }} name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
        </Grid>
        <Grid item xs={gridItemXS} sm={gridItemSM} md={ gridItemMD} lg={4.5}>
          <Box display='flex' justifyContent='left' >
            {detailSearchValues.isCarDealer ? <GridComponent icon={<StoreIcon sx={{ fontSize: ICON_FONT_SIZE }} />} value={"Händler"} /> : <GridComponent icon={<PersonIcon sx={{ fontSize: ICON_FONT_SIZE }} />} value={"Privat"} />}
          </Box>
        </Grid>
        <Grid item xs={gridItemXS} sm={gridItemSM} md={ gridItemMD}>
          <GridComponent icon={<SpeedIcon sx={{ fontSize: ICON_FONT_SIZE }} />} value={seperateThousand(detailSearchValues.psPower) + " PS"} />
        </Grid>
        <Grid item xs={gridItemXS} sm={gridItemSM} md={4} lg={ detailSearchValues.mileageKm > 999_999 ? 6: 4.5}>
          <Box display='flex' >
            <GridComponent icon={<DirectionsCarIcon sx={{ fontSize: ICON_FONT_SIZE }} />} value={seperateThousand(detailSearchValues?.mileageKm) + " KM"} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box display='flex' justifyContent='left' >
            <Grid item><Box sx={{ display: 'flex', marginBottom: LINE_HEIGHT }}> <LocationOnIcon sx={{ fontSize: ICON_FONT_SIZE }} />  <Typography sx={{ marginLeft: '.5rem', whiteSpace: 'nowrap' }} variant='body1' component='p'>{detailSearchValues.city}</Typography></Box></Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
