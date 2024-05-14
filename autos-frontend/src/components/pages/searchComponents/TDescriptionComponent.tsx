import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { ViewDetailIconStyle, paperElevationValue, paperMarginTopValue, paddingPaperDetailSearch } from '../../../themes/ThemeColor'
import Person3Icon from '@mui/icons-material/Person3';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import { seperateThousand } from '../../../helper/helper';
import { AxiosPaper } from '../../../../../autos-backend/src/interfaces/IAxiosData';

interface GridComponentProps {
    icon: JSX.Element,
    title: string,
    value: any
  }

const gridItemXS = 6;
const gridItemMD = 4;

export const TDescriptionComponent: React.FC<{ detailSearchValues : AxiosPaper }> = ({ detailSearchValues }) => {

    const GridComponent: React.FC<GridComponentProps> = ({ icon, title, value }) => {
        return <Grid item xs={6}><div style={{ display: 'flex', margin: '0.5rem' }}> {icon} <div><Typography sx={{ fontSize: '0.9rem', color: 'secondary.contrastText', fontWeight: '300' }} display='inline-block' variant='h6' component='h2'>{title}</Typography> <Typography variant='subtitle2' component='p'>{value}</Typography></div></div></Grid>
    
      }

  return (
    <Box sx={{ marginTop: paperMarginTopValue }}>
    <Grid container>
      <Grid item xs={ gridItemXS } md={ gridItemMD }>
        <GridComponent icon={<Person3Icon sx={ViewDetailIconStyle} />} title='Fahrzeughalter' value={detailSearchValues?.vehicleOwners} />
      </Grid>
      <Grid item xs={ gridItemXS } md={ gridItemMD }>
        <GridComponent icon={<AddRoadIcon sx={ViewDetailIconStyle} />} title='Kilometerstand' value={seperateThousand(detailSearchValues?.mileageKm) + " km"} />
      </Grid>
      <Grid item xs={ gridItemXS } md={ gridItemMD }>
        <GridComponent icon={<CalendarTodayIcon sx={ViewDetailIconStyle} />} title='Erstzulassung' value={(detailSearchValues?.registrationMonth < 10 ? '0' + detailSearchValues.registrationMonth : detailSearchValues?.registrationMonth) + " / " + detailSearchValues?.registrationYear} />
      </Grid>
      <Grid item xs={ gridItemXS } md={ gridItemMD }>
        <GridComponent icon={<DirectionsCarIcon sx={ViewDetailIconStyle} />} title='Leistung' value={detailSearchValues?.psPower + " PS"} />
      </Grid>
      <Grid item xs={ gridItemXS } md={ gridItemMD }>
        <GridComponent icon={<LocalGasStationIcon sx={ViewDetailIconStyle} />} title='Kraftstoffart' value={detailSearchValues?.fuel} />
      </Grid>
      <Grid item xs={ gridItemXS } md={ gridItemMD }>
        <GridComponent icon={<CarCrashIcon sx={ViewDetailIconStyle} />} title='Fahrzeugzustand' value={detailSearchValues && detailSearchValues?.accident ? 'Unfallwagen' : 'Unfallfrei'} />
      </Grid>
    </Grid>
  </Box>    
)
}
