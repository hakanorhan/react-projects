import React, { useEffect, useState } from 'react'
import { DivSearchInserate, DivViewDetail, ViewDetailIconStyle, primaryColorMain, secondaryColorLight } from '../../themes/ThemeColor'
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import axios from 'axios';
import { AxiosDetailsearch } from '../../../../autos-backend/src/interfaces/IAxiosData';
import CarImages from './dashboards/admin/components/CarImages';
import { Box, Button, Grid, IconProps, TextField, Typography } from '@mui/material';

import Person3Icon from '@mui/icons-material/Person3';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import Rating from '@mui/material/Rating';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldArea from '../formularFields/TextFieldArea';


interface ViewDetailSearchComponentProps {
    id: number | null
}

interface GridComponentProps {
  icon: JSX.Element,
  title: string,
  value: string
}

interface GridTechnicalDetails {
  title: string,
  value?: string,
  icon?: JSX.Element
}

const ViewDetailSearch: React.FC<ViewDetailSearchComponentProps> = ({ id }) => {
    
    const [listValues, setListValues] = useState([]);
    
    useEffect(() => {
        // valid brand
        const fetchData = async() => {   
          // Detail search
          await axios.get<AxiosDetailsearch>(`${URLs.ORIGIN_SERVER}` + URLs.FETCH_DETAIL_SEARCH + `/${id}`, { withCredentials: true })
                
          .then(response => { 
            const axiosData: AxiosDetailsearch = response.data;
            alert(axiosData.model)    
            //setListValues(response.data.car);
                 })
                 .catch(error => console.log(error))
                }
        //fetchData();
        }, [])

    const GridComponent: React.FC<GridComponentProps> = ({ icon, title, value }) => {
      return <Grid item xs={6}><div style={{ display:'flex', margin:'0.5rem' }}> { icon } <div><Typography sx={{ fontSize:'0.9rem', color:'gray', fontWeight:'300' }} display='inline-block' variant='h6' component='h2'>{ title }</Typography> <Typography variant='subtitle2' component='p'>{ value }</Typography></div></div></Grid>
              
    }

    const GridTechnicalComponent: React.FC<GridTechnicalDetails> = ({ title, value, icon }) => {
      return <Grid sx={{ display:'flex', padding:'0.7rem' }} item xs={12}> <Grid sx={{ fontWeight:'700' }} item xs={6}>{ `${title}:` }</Grid> <Grid sx={{ fontWeight:'300' }} item xs={6}>{ value }{ icon }</Grid>
    </Grid>
    }

    return (<>
        <CarImages id={id}/>
        <Box sx={{ padding:'0.7rem', marginTop:'0.2rem', backgroundColor:'white'}}>
          <Grid container>
            {/* Marke Modell */}
            <Grid item xs={6}>
              <Grid item xs={12}> <Typography variant='h6' component='h1'>Audi A3</Typography> </Grid>
              <hr />
            </Grid>
            <Grid item xs={6} sx={{ backgroundColor: secondaryColorLight }}>
              <Typography variant='h5' component='h2' sx={{ marginRight:'1rem', float:'right', color: primaryColorMain, backgroundColor:secondaryColorLight }}>17.500 €</Typography>
            </Grid>
            <Grid item xs={12}> <Typography variant='subtitle1' component='h1'>Privatanbieter  <Rating sx={{ verticalAlign:'middle' }} name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /></Typography></Grid>
            <Grid item xs={12}> <Typography variant='subtitle1' component='h1'>Gelsenkirchen</Typography></Grid>
            <Grid item xs={12}> <Button sx={{ height:'45px' }}>Kontaktieren</Button></Grid>
              
            </Grid>

        </Box>
        <Box sx={{ marginTop:'0.5rem', backgroundColor:'white' }}>
          <Grid container>
            <Grid item xs={6}>
              <GridComponent icon={<Person3Icon sx={ ViewDetailIconStyle } />} title='Fahrzeughalter' value='2' />
            </Grid>
            <Grid item xs={6}>
            <GridComponent icon={<AddRoadIcon sx={ ViewDetailIconStyle } />} title='Kilometerstand' value='125.000km' />
            </Grid>
            <Grid item xs={6}>
            <GridComponent icon={<CalendarTodayIcon sx={ ViewDetailIconStyle } />} title='Erstzulassung' value='Juni 2012' />
            </Grid>
            <Grid item xs={6}>
            <GridComponent icon={<DirectionsCarIcon sx={ ViewDetailIconStyle } />} title='Leistung' value='102 PS' />
            </Grid>
            <Grid item xs={6}>
            <GridComponent icon={<LocalGasStationIcon sx={ ViewDetailIconStyle } />} title='Kraftstoffart' value='Benzin' />
            </Grid>
            <Grid item xs={6}>
            <GridComponent icon={<CarCrashIcon sx={ ViewDetailIconStyle } />} title='Fahrzeugzustand' value='Unfallfrei' />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginTop:'0.5rem', backgroundColor:'white' }}>
          <h4 style={{ padding:'0.7rem' }}> Technische Daten </h4>
          <hr style={{ margin:'0.7rem' }}/>
          <Grid container>
            <GridTechnicalComponent title='Marke' value='Audi' />
            <GridTechnicalComponent title='Modell' value='A3' />
            <GridTechnicalComponent title='Fahrzeugtyp' value='Kleinwagen' />
            <GridTechnicalComponent title='Hubraum' value='1125 ccm' />
            <GridTechnicalComponent title='Getriebeart' value='Automatik' />
            <GridTechnicalComponent title='Klimatisierung' value='Klimaautomatik' />
            <GridTechnicalComponent title='Schadstoffklasse' value='Euro6' />
            <GridTechnicalComponent title='Umweltplakette' value='Grün' />
            <GridTechnicalComponent title='Farbe' value='rot' />
            <GridTechnicalComponent title='HU neu' icon={<Check sx={{ color: secondaryColorLight }}/>} />
            <GridTechnicalComponent title='AU neu' icon={<CloseIcon sx={{ color: secondaryColorLight }} />} />
            <GridTechnicalComponent title='Scheckheftgepflegt' icon={<Check sx={{ color: secondaryColorLight }}/>} />
            
          </Grid>
        </Box>
        
        <Box sx={{ marginTop:'0.5rem', backgroundColor:'white' }}>
          <h4 style={{ padding:'0.7rem' }}> Fahrzeugbeschreibung </h4>
          <hr style={{ margin:'0.7rem' }}/>
          <TextFieldArea padding='0.7rem' minRows={10} maxRows={10} disbled={true} areaText='Verkaufe meinem Opel Astra in einem sehr gutem Zustand. TÜV aktuell ! Bremsen neu und Scheckheftgepflegt! Außerdem wurde das Auto jährlich zum Kundendienst in einer vertrauten Opel Werkstatt gebracht .'/>
        </Box>

      </>
  )
}

export default ViewDetailSearch;

/*
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function HalfRating() {
  return (
    <Stack spacing={1}>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
    </Stack>
    */
