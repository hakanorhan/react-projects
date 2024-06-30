import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import React from 'react'
import { LINE_HEIGHT, ICON_FONT_SIZE } from '../../../../themes/Theme'
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

export const ListTDescriptionComponent: React.FC<{ detailSearchValues: AxiosPaper }> = ({ detailSearchValues }) => {
  
  const GridComponent: React.FC<GridComponentProps> = ({ icon, value }) => {
    return <Box sx={{ display: 'flex', justifyContent:'left', marginBottom: LINE_HEIGHT, marginRight:'0.8rem' }}> {icon}  <Typography sx={{ color:'text.primary', marginLeft: '.5rem', whiteSpace: 'nowrap' }} variant='body1' component='p'>{value}</Typography></Box>
  }

  return (
    <Box display='flex' flexWrap='wrap'>
      <GridComponent icon={<SpeedIcon sx={{ fontSize: ICON_FONT_SIZE }} />} value={seperateThousand(detailSearchValues.psPower) + " PS"} />
      <GridComponent icon={<DirectionsCarIcon sx={{ fontSize: ICON_FONT_SIZE }} />} value={seperateThousand(detailSearchValues?.mileageKm) + " KM"} />
      <GridComponent icon={<LocationOnIcon sx={{fontSize: ICON_FONT_SIZE}}/>} value={detailSearchValues.city} />
      {detailSearchValues.isCarDealer ? <GridComponent icon={<StoreIcon sx={{ fontSize: ICON_FONT_SIZE }} />} value={"Händler"} /> : <GridComponent icon={<PersonIcon sx={{ fontSize: ICON_FONT_SIZE }} />} value={"Privat"} />}
      
      <Rating sx={{ color: 'icon.main', marginRight:'0.8rem', verticalAlign: 'middle', fontSize: ICON_FONT_SIZE }} name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly /> 22 Beweruntungen erhalten
      
    </Box>
  )
}
