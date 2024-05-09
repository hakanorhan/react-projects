import React, { useEffect, useState } from 'react'
import { AxiosDetailsearch } from '../../../../autos-backend/src/interfaces/IAxiosData';
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import axios from 'axios';
import { Box, Button, Grid, Paper, Rating, Typography } from '@mui/material';
import { paddingPaperDetailSearch, paperElevationValue, paperMarginTopValue, paperViewDetailSearch } from '../../themes/ThemeColor';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CarImages, { CarImagesProps } from './dashboards/admin/components/CarImages';
import { seperateThousand } from '../../helper/helper';
import { TDescriptionComponent } from './searchComponents/TDescriptionComponent';
import TextFieldArea from '../formularFields/TextFieldArea';

interface GridTechnicalDetails {
    title: string,
    value?: string,
    icon?: JSX.Element,
    indexColor?: number
  }

const ViewDetailGeneral: React.FC<CarImagesProps> = ( { id } ) =>  {
  
  const [detailSearchValues, setDetailSearchValues] = useState<AxiosDetailsearch | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Detail search
      await axios.get<AxiosDetailsearch>(`${URLs.ORIGIN_SERVER}` + URLs.FETCH_DETAIL_SEARCH + `/${id}`, { withCredentials: true })

        .then(response => {
          const axiosData: AxiosDetailsearch = response.data;
          setDetailSearchValues(axiosData);
        })
        .catch(error => console.log(error))
    }
    fetchData();
  }, [id])

  const GridTechnicalComponent: React.FC<GridTechnicalDetails> = ({ title, value, icon, indexColor }) => {
    return <Grid sx={{
      backgroundColor: { xs: indexColor && indexColor % 2 === 1 ? 'primary.main' : 'secondary.main' },
      display: 'flex', padding: '0.7rem'
    }} item xs={12}> <Grid sx={{ fontWeight: '700' }} item xs={6}>{`${title}:`}</Grid> <Grid sx={{ fontWeight: '300' }} item xs={6}>{value}{icon}</Grid>
    </Grid>
  }

  const CheckOrFalseIcon: React.FC<{ checked: boolean }> = ({ checked }) => {
    return checked ? <Check sx={{ color: 'secondary.contrastText'}} /> : <CloseIcon sx={{ color: 'sexondary.contrastText' }} />
  };

  return (<>
  <Box sx={{ display:'flex', justifyContent:'center' }}>
    <Grid container xs={12} columnSpacing={{ xs:0 }}>
      <Grid item xs= {12} md = {6}>
    <CarImages id={id} />
    </Grid>
    {detailSearchValues ?
      <>
        <Grid item xs={12} md = {6}>
        <Paper elevation={ 0 } sx={ paperViewDetailSearch }>
          <Grid container>
            {/* Marke Modell */}
            <Grid item xs={6}>
              <Grid item xs={12}> <Typography sx={{ marginBottom:'0.5rem', color:'secondary.contrastText' }} variant='h6' component='h1'>{`${detailSearchValues?.brand} ${detailSearchValues?.model}`}</Typography> </Grid>
              <hr style={{ marginBottom:'0.5rem' }}/>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h5' component='h2' sx={{ marginBottom:'0.5rem', marginRight: '1rem', float: 'right', color: 'secondary.contrastText' }}> {seperateThousand(detailSearchValues?.price)} €</Typography>
            </Grid>
            <Grid item xs={12}> <Typography sx={{ marginBottom:'0.5rem', color:'secondary.contrastText' }} variant='subtitle1' component='h1'>{detailSearchValues.isCardealer ? 'Händler' : 'Privatanbieter'}  <Rating sx={{ verticalAlign: 'middle' }} name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /></Typography></Grid>
            <Grid item xs={12}> <Typography sx={{ marginBottom:'0.5rem', color:'secondary.contrastText' }} variant='subtitle1' component='h1'>{detailSearchValues.city} <b>{detailSearchValues.federalState}</b></Typography></Grid>
            <Grid item xs={12}> <Button sx={{ height: '45px' }}>Kontaktieren</Button></Grid>

          </Grid>

        </Paper>
        </Grid>

        <TDescriptionComponent detailSearchValues={detailSearchValues.axiosPaper} />

        <Paper elevation={ 0 } sx={ paperViewDetailSearch }>
        <hr />
          <h4 style={{ paddingTop: paperMarginTopValue }}> Technische Daten </h4>
          <Grid container sx={{ paddingTop: paperMarginTopValue }}>
            <GridTechnicalComponent indexColor={1} title='Marke' value={detailSearchValues?.brand} />
            <GridTechnicalComponent indexColor={2} title='Modell' value={detailSearchValues?.model} />
            <GridTechnicalComponent indexColor={1} title='Fahrzeugtyp' value={detailSearchValues.cartype} />
            <GridTechnicalComponent indexColor={2} title='Farbe' value={detailSearchValues.color} />
            <GridTechnicalComponent indexColor={1} title='Hubraum' value={`${detailSearchValues.cubicCapacity} ccm³`} />
            <GridTechnicalComponent indexColor={2} title='Getriebeart' value={detailSearchValues.transmission} />
            <GridTechnicalComponent indexColor={1} title='HU neu' icon={<CheckOrFalseIcon checked={detailSearchValues.huNew} />} />
            <GridTechnicalComponent indexColor={2} title='AU neu' icon={<CheckOrFalseIcon checked={detailSearchValues.auNew} />} />

          </Grid>
        </Paper>

        <Paper elevation={ 0 } sx={ paperViewDetailSearch }>
        <hr  />
          <h4  style={{ paddingTop: paperMarginTopValue }}> Ausstattung </h4>
          
          <Grid container sx={{ paddingTop: paperMarginTopValue }}>
            <GridTechnicalComponent indexColor={1} title='Scheckheftgepflegt' icon={<CheckOrFalseIcon checked={detailSearchValues.scheckheft} />} />
            <GridTechnicalComponent indexColor={2} title='Fahrtüchtig' icon={<CheckOrFalseIcon checked={detailSearchValues.fittodrive} />} />
            <GridTechnicalComponent indexColor={1} title='Abstandstempomat' icon={<CheckOrFalseIcon checked={detailSearchValues.abstandstempomat} />} />
            <GridTechnicalComponent indexColor={2} title='Ambientbeleuchtung' icon={<CheckOrFalseIcon checked={detailSearchValues.ambientbeleuchtung} />} />
            <GridTechnicalComponent indexColor={1} title='Klimatisierung' value={detailSearchValues.clima} />
            <GridTechnicalComponent indexColor={2} title='Head-up Display' icon={<CheckOrFalseIcon checked={detailSearchValues.headupdisplay} />} />
            <GridTechnicalComponent indexColor={1} title='Totwinkelassistent' icon={<CheckOrFalseIcon checked={detailSearchValues.totwinkelassistent} />} />
          </Grid>
        </Paper>

        
        <Grid xs={12} container>
        
        <Paper elevation={ 0 } sx={ paperViewDetailSearch }>
          <hr />
           <h4 style={{ paddingTop: paperMarginTopValue }}>Fahrzeugbeschreibung</h4>
          <Grid item xs={12}> <TextFieldArea minRows={8} maxRows={10} disbled={true} areaText={detailSearchValues.description} /> </Grid>
        </Paper>
        </Grid>
        
      </>
      : <p> Fehler </p>
    }
    </Grid>
    </Box>
  </>
  )

    
}

export default ViewDetailGeneral;