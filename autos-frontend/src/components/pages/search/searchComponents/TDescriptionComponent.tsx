import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react'
import { COMPONENT_DISTANCE, SX_ICON } from '../../../../themes/Theme'
import Person3Icon from '@mui/icons-material/Person3';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import { seperateThousand } from '../../../../helper/helper';
import SpeedIcon from '@mui/icons-material/Speed';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

interface GridComponentProps {
    icon: JSX.Element,
    value: any
  }

export const TDescriptionComponent = () => {

  const detailSearchValues = useSelector((state: RootState) => state.detailSearch.detailState);

    const GridComponent: React.FC<GridComponentProps> = ({ icon, value }) => {
        return <Grid item sx={{ marginBottom: COMPONENT_DISTANCE, marginRight:'1rem' }}><Box sx={{ display: 'flex' }}> {icon}  <Typography sx={{ fontWeight: 'bold', marginLeft:'.5rem', whiteSpace: 'nowrap' }} variant='body1' component='p'>{value}</Typography></Box></Grid>
    
      }

  return (
   
      <Box sx={{ color:'text.primary', display:'flex', flexWrap:'wrap'}}>
        <GridComponent icon={<Person3Icon sx={ SX_ICON } />} value={detailSearchValues?.vehicleOwners} />
        <GridComponent icon={<DirectionsCarIcon sx={ SX_ICON }/>} value={seperateThousand(detailSearchValues?.mileageKm) + " KM"} />

        <Box sx={{ display:'flex'}}>
          { detailSearchValues ?
        <GridComponent icon={<CalendarTodayIcon sx={ SX_ICON }/>} value={(detailSearchValues.registrationMonth < 10 ? '0' + detailSearchValues.registrationMonth : detailSearchValues?.registrationMonth) + " / " + detailSearchValues?.registrtionYear} />
          : <></>}
        </Box>

      
        <GridComponent icon={<SpeedIcon sx={ SX_ICON } />}  value={seperateThousand(detailSearchValues?.powerPS) + " PS"} />
      
        <GridComponent icon={<LocalGasStationIcon sx={ SX_ICON }/>} value={detailSearchValues?.fuel} />
      
      <Box sx={{ display:'flex' }}>
        <GridComponent icon={<CarCrashIcon sx={ SX_ICON } />}  value={detailSearchValues && detailSearchValues?.accident ? 'Unfallwagen' : 'Unfallfrei'} />
        </Box>
      
    </Box>
)
}
