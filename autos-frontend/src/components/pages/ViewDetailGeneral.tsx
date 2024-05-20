import React, { useEffect, useState } from 'react'
import { AxiosDetailsearch } from '../../../../autos-backend/src/interfaces/IAxiosData';
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import axios from 'axios';
import { Box, Button, Grid, Paper, Rating, Typography } from '@mui/material';
import { COMPONENT_DISTANCE, DivContactBottom, GreyHorizontalBoldHR, GreyHorizontalHR, GreyVerticalBoldHR, GreyVerticalHR, ICON_FONT_SIZE, LINE_HEIGHT, MainBox, SearchContainer, paperViewDetailSearch, paperViewDetailSearchTextArea } from '../../themes/Theme';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CarImages, { CarImagesProps } from './dashboards/admin/components/CarImages';
import { seperateThousand } from '../../helper/helper';
import { TDescriptionComponent } from './searchComponents/TDescriptionComponent';
import TextFieldArea from '../formularFields/TextFieldArea';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';

const gridItemXS = 4;
const gridItemSM = 4;
const gridItemMD = 4;

interface GridTechnicalDetails {
  title: string,
  value?: string,
  icon?: JSX.Element,
  indexColor?: number
}

interface GridComponentProps {
  icon: JSX.Element,
  value: any
}

const ViewDetailGeneral: React.FC<CarImagesProps> = ({ id }) => {

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
      display: 'flex', padding: '0.7rem'
    }} item xs={12}> <Grid item xs={6}><Typography sx={{ fontWeight: 'bold' }} variant='body1' component='p'>{`${title}:`}</Typography></Grid> <Grid item xs={6}> <Typography sx={{ fontWeight: 'bold' }} variant='body1' component='p'>{value}</Typography>{icon}</Grid>
    </Grid>
  }

  const CheckOrFalseIcon: React.FC<{ checked: boolean }> = ({ checked }) => {
    return checked ? <Check sx={{ color: 'secondary.contrastText' }} /> : <CloseIcon sx={{ color: 'sexondary.contrastText' }} />
  };

  const GridComponent: React.FC<GridComponentProps> = ({ icon, value }) => {
    return <Grid item><Box sx={{ display: 'flex', justifyContent:'left', marginBottom: LINE_HEIGHT }}> {icon}  <Typography sx={{ fontFamily:'Poppins-Regular', marginLeft: '.5rem', whiteSpace: 'nowrap' }} variant='body1' component='p'>{value}</Typography></Box></Grid>
  }

  const ContactFixed = () => {
    
    const [contactIsVisible, setContactIsVisible] = useState(true);

    useEffect(() => {
      const handleScroll = () => {
        
        const getY = window.scrollY < 1200;
        setContactIsVisible(getY)
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [contactIsVisible])

    return <Box sx={{
        width:'100%',
        position: 'fixed',
        bottom: 0,
        display: contactIsVisible ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: COMPONENT_DISTANCE,
        backgroundColor: 'white'
      }} >
        <Box sx={{ width:'50%' }}>
          <Button sx={{ height: '55px' }} variant='contained' endIcon={<CallIcon />}>Anrufen</Button>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Button sx={{ height: '55px', backgroundColor: 'orange' }} variant='contained' endIcon={<EmailIcon />}>Email</Button>
        </Box>
      </Box>
  }

  return (

    <Box sx={{ width:'100%', margin:'auto' }}>

      <ContactFixed />
      
        {/*  Container */}
          <Box>
            <CarImages id={id} multiple={true} />

          </Box>
          {detailSearchValues ?
            <Box sx={{ width: '95%', margin:'auto' }}>

              <Grid sx={{ paddingTop: COMPONENT_DISTANCE }} item xs={12}>
                <Grid container>
                  <Grid sx={{ display: 'flex' }} item xs={4}>
                    <ShareIcon sx={{ marginRight: COMPONENT_DISTANCE }} /> <Typography sx={{ fontFamily:'Poppins-Bold' }} variant='body1' component='p'>{"Teilen"}</Typography>
                  </Grid>
                  <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={4}>
                    <FavoriteBorderIcon sx={{ marginRight: COMPONENT_DISTANCE }} /> <Typography sx={{ fontFamily: 'Poppins-Bold' }} variant='body1' component='p'>{"Merken"}</Typography>
                  </Grid>
                  <Grid item sx={{ justifyContent: 'end', display: 'flex' }} xs={4}>
                    <PrintIcon sx={{ marginRight: COMPONENT_DISTANCE }} /> <Typography sx={{ fontFamily:'Poppins-Bold' }} variant='body1' component='p'>{"Drucken"}</Typography>
                  </Grid>
                </Grid>

                <Grid sx={{ height: '100%' }} container >
                  {/* Marke Modell */}
                  <Grid item xs={12}> <Typography sx={{ fontFamily: 'Poppins-Bold', color: 'secondary.contrastText' }} variant='h4' component='h1'>{`${detailSearchValues?.brand} ${detailSearchValues?.model}`}</Typography> </Grid>
                
                <Grid item xs={12}>
                  <GreyHorizontalBoldHR />
                </Grid>
                        <Grid item xs={5.5}>
                            <Box sx={{ paddingTop: COMPONENT_DISTANCE, paddingBottom: COMPONENT_DISTANCE }}>
                                <Typography variant='h6' component='h2' sx={{  color: 'blue', fontFamily:'Poppins-Bold', display: 'flex', justifyContent: 'center' }}>{seperateThousand(detailSearchValues.price)} {" €"}</Typography>
                                <Typography variant='body2' component='p' sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center'  }}>{"Preis"}</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={1}> <GreyVerticalBoldHR /> </Grid>

                        <Grid item xs={5.5}>
                            <Box sx={{ paddingTop: COMPONENT_DISTANCE, paddingBottom: COMPONENT_DISTANCE }}>
                                <Typography variant='h6' component='h2' sx={{ color: 'blue', fontFamily:'Poppins-Bold', display: 'flex', justifyContent: 'center' }}>{seperateThousand(550)} {" €"}</Typography>
                                <Typography variant='body2' component='p' sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>{"Finanzierung"}</Typography>
                            </Box>
                        </Grid>

                    <Grid sx={{ marginBottom: {xs: COMPONENT_DISTANCE} }} item xs={12}>
                    <GreyHorizontalBoldHR />
                  </Grid>

                  <TDescriptionComponent detailSearchValues={detailSearchValues.axiosPaper} />

                  <Grid item xs={gridItemXS} sm={gridItemSM} md={gridItemMD} lg={3.5}>
          <Rating sx={{ verticalAlign: 'middle', fontSize: ICON_FONT_SIZE }} name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
        </Grid>
        <Grid item xs={gridItemXS} sm={gridItemSM} md={gridItemMD} lg={4.5}>
          <Box display='flex' justifyContent='left' >
            {detailSearchValues.isCardealer ? <GridComponent icon={<StoreIcon sx={{ fontSize: ICON_FONT_SIZE }} />} value={"Händler"} /> : <GridComponent icon={<PersonIcon sx={{ fontSize: '1.2rem' }} />} value={"Privat"} />}
          </Box>
        </Grid>
        <Grid item xs={detailSearchValues.city.length > 13 ? 12 : gridItemXS} sm={detailSearchValues.city.length > 13 ? 12 : gridItemSM} md={12} lg={detailSearchValues.city.length > 13 ? 12 : 4} xl={detailSearchValues.city.length > 8 ? 12 : 4}>
          <Box display='flex' justifyContent='left' >
            <Grid item><Box sx={{ display: 'flex', marginBottom: LINE_HEIGHT }}> <LocationOnIcon sx={{ fontSize: ICON_FONT_SIZE }} />  <Typography sx={{ fontFamily:'Poppins-Regular', marginLeft: '.5rem', whiteSpace: 'nowrap' }} variant='body1' component='p'>{detailSearchValues.city}</Typography></Box></Grid>
          </Box>
        </Grid>

                </Grid>
              </Grid>

              <Box sx={paperViewDetailSearch}>
                <GreyHorizontalHR />
                <Grid container>
                  <Grid item xs={12} lg={4}>
                    <Typography variant='h6' component='h4' sx={{ fontFamily:'Poppins-Bold', paddingTop: COMPONENT_DISTANCE }}> Technische Daten </Typography>
                  </Grid>
                  <Grid container xs={12} lg={8} sx={{ paddingTop: COMPONENT_DISTANCE }}>
                    <GridTechnicalComponent indexColor={1} title='Marke' value={detailSearchValues?.brand} />
                    <GridTechnicalComponent indexColor={2} title='Modell' value={detailSearchValues?.model} />
                    <GridTechnicalComponent indexColor={1} title='Fahrzeugtyp' value={detailSearchValues.cartype} />
                    <GridTechnicalComponent indexColor={2} title='Farbe' value={detailSearchValues.color} />
                    <GridTechnicalComponent indexColor={1} title='Hubraum' value={`${detailSearchValues.cubicCapacity} ccm³`} />
                    <GridTechnicalComponent indexColor={2} title='Getriebeart' value={detailSearchValues.transmission} />
                    <GridTechnicalComponent indexColor={1} title='HU neu' icon={<CheckOrFalseIcon checked={detailSearchValues.huNew} />} />
                    <GridTechnicalComponent indexColor={2} title='AU neu' icon={<CheckOrFalseIcon checked={detailSearchValues.auNew} />} />

                  </Grid>
                </Grid>
              </Box>

              <Box sx={paperViewDetailSearch}>


                <GreyHorizontalHR />
                <Grid container>
                  <Grid item xs={12} lg={4}>
                    <Typography variant='h6' component='h4' sx={{ fontFamily:'Poppins-Bold', paddingTop: COMPONENT_DISTANCE }}> Ausstattung </Typography>
                  </Grid>

                  <Grid xs={12} lg={8} container sx={{ paddingTop: COMPONENT_DISTANCE }}>
                    <GridTechnicalComponent indexColor={1} title='Scheckheftgepflegt' icon={<CheckOrFalseIcon checked={detailSearchValues.scheckheft} />} />
                    <GridTechnicalComponent indexColor={2} title='Fahrtüchtig' icon={<CheckOrFalseIcon checked={detailSearchValues.fittodrive} />} />
                    <GridTechnicalComponent indexColor={1} title='Abstandstempomat' icon={<CheckOrFalseIcon checked={detailSearchValues.abstandstempomat} />} />
                    <GridTechnicalComponent indexColor={2} title='Ambientbeleuchtung' icon={<CheckOrFalseIcon checked={detailSearchValues.ambientbeleuchtung} />} />
                    <GridTechnicalComponent indexColor={1} title='Klimatisierung' value={detailSearchValues.clima} />
                    <GridTechnicalComponent indexColor={2} title='Head-up Display' icon={<CheckOrFalseIcon checked={detailSearchValues.headupdisplay} />} />
                    <GridTechnicalComponent indexColor={1} title='Totwinkelassistent' icon={<CheckOrFalseIcon checked={detailSearchValues.totwinkelassistent} />} />
                  </Grid>
                </Grid>
              </Box>


              <Grid xs={12} container>

                <Box sx={paperViewDetailSearchTextArea}>
                  <GreyHorizontalHR />
                  <Typography variant='h6' component='h4' sx={{ fontFamily:'Poppins-Bold', paddingTop: COMPONENT_DISTANCE }}>Fahrzeugbeschreibung</Typography>
                  <Grid sx={{ paddingTop: COMPONENT_DISTANCE }} item xs={12}> <TextFieldArea minRows={8} maxRows={10} disbled={true} areaText={detailSearchValues.description} /> </Grid>
                </Box>

              </Grid>

                <Grid sx={{paddingTop: COMPONENT_DISTANCE}}>
                  <Typography sx={{ fontFamily: 'Poppins-Bold' }} variant='h6' component='h4'>Informationen zum/zur Verkäufer:in</Typography>
                
                </Grid>

            </Box>
            : <p> Fehler </p>
          }
    </Box>
  )


}

export default ViewDetailGeneral;

/*
                  <Grid sx={{
                    display: 'flex',
                  }} container xs={12} spacing={1}>
                    <Grid item xs={6}>
                      <Button variant='contained' endIcon={<CallIcon />}>Anrufen</Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button sx={{ backgroundColor: 'black' }} variant='contained' endIcon={<EmailIcon />}>Email</Button>
                    </Grid>
                  </Grid>
*/