import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { ViewDetailIconStyle, paperElevationValue, paperMarginTopValue, paddingPaperDetailSearch, COMPONENT_DISTANCE, paperFontSize } from '../../../themes/ThemeColor'
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
    value: any
  }

const gridItemXS = 4;
const gridItemMD = 4;

export const TDescriptionComponent: React.FC<{ detailSearchValues : AxiosPaper }> = ({ detailSearchValues }) => {

    const GridComponent: React.FC<GridComponentProps> = ({ icon, value }) => {
        return <Grid item sx={{ marginBottom: "1rem" }}><Box sx={{ display: 'flex' }}> {icon}  <Typography sx={{ marginLeft:'.5rem', whiteSpace: 'nowrap', fontSize: paperFontSize }}  component='p'>{value}</Typography></Box></Grid>
    
      }

  return (
    <Box sx={{ marginTop: paperMarginTopValue }}>
    <Grid container>
      <Grid item xs={ gridItemXS } md={ gridItemMD }>
        <GridComponent icon={<Person3Icon />} value={detailSearchValues.vehicleOwners} />
      </Grid>
      <Grid item xs={ gridItemXS } md={ gridItemMD }>
        <GridComponent icon={<AddRoadIcon />} value={seperateThousand(detailSearchValues.mileageKm) + " KM"} />
      </Grid>
      <Grid item xs={ gridItemXS } md={ gridItemMD }>
        <Box sx={{ display:'flex', justifyContent: 'end' }}>
        <GridComponent icon={<CalendarTodayIcon />} value={(detailSearchValues?.registrationMonth < 10 ? '0' + detailSearchValues.registrationMonth : detailSearchValues?.registrationMonth) + " / " + detailSearchValues?.registrationYear} />
        </Box>
      </Grid>
      <Grid item xs={ gridItemXS } md={ gridItemMD }>
        <GridComponent icon={<DirectionsCarIcon  />}  value={seperateThousand(detailSearchValues?.psPower) + " PS"} />
      </Grid>
      <Grid item xs={ gridItemXS } md={ gridItemMD }>
        <GridComponent icon={<LocalGasStationIcon />} value={detailSearchValues?.fuel} />
      </Grid>
      <Grid item xs={ gridItemXS } md={ gridItemMD }>
      <Box sx={{ display:'flex', justifyContent: 'end' }}>
        <GridComponent icon={<CarCrashIcon />}  value={detailSearchValues && detailSearchValues?.accident ? 'Unfallwagen' : 'Unfallfrei'} />
        </Box>
      </Grid>
    </Grid>
  </Box>    
)
}
