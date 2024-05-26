import { Box, Button, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { seperateThousand } from '../../../../helper/helper';
import { AxiosPaper, AxiosPaperList } from '../../../../interfaces/IAxiosData';
import CalculateIcon from '@mui/icons-material/Calculate';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { COMPONENT_DISTANCE, GreyHorizontalHR, fontBold } from '../../../../themes/Theme';
import ShareIcon from '@mui/icons-material/Share';
import { ListTDescriptionComponent } from './ListTDescriptionComponent';

export const ShowFastPaper: React.FC<{ detailSearchValues: AxiosPaperList }> = ({ detailSearchValues }) => {

    const axiosPaper: AxiosPaper = {
        inseratId: detailSearchValues.inseratId, mileageKm: detailSearchValues.mileageKm, registrationMonth: detailSearchValues.registrationMonth,
        registrationYear: detailSearchValues.registrationYear, psPower: detailSearchValues.psPower, fuel: detailSearchValues.fuel,
        accident: detailSearchValues.accident, vehicleOwners: detailSearchValues.vehicleOwners, city: detailSearchValues.city, isCarDealer: detailSearchValues.isCarDealer
    };

    return (
        <>{/* backgroundColor:{ xs:'yellow', sm:'whitesmoke', md:'red', lg:'orange', xl:'whitesmoke', xxl: 'yellow' } */}
            <CardContent>
                <Typography sx={{ fontFamily: fontBold }} variant='h6' component='h1'>{detailSearchValues.brand} {detailSearchValues.model}</Typography>
                

                <Grid container >
                    {/*<TDescriptionComponent detailSearchValues={axiosPaper} />
                     */}
                   
                    <ListTDescriptionComponent detailSearchValues={axiosPaper} />

                    <Grid item xs={5.5}>
                <Box sx={{ paddingTop: COMPONENT_DISTANCE, paddingBottom: COMPONENT_DISTANCE }}>
                  <Typography variant='h6' component='h2' sx={{ color: 'primary.main', fontFamily: fontBold, display: 'flex', justifyContent: 'center' }}>{seperateThousand(detailSearchValues.price)} {" €"}</Typography>
                  <Typography variant='body2' component='p' sx={{ display: 'flex', justifyContent: 'center' }}>{"Preis"}</Typography>
                </Box>
              </Grid>

              <Grid item xs={5.5}>
                <Box sx={{ paddingTop: COMPONENT_DISTANCE, paddingBottom: COMPONENT_DISTANCE }}>
                <Button sx={{ backgroundColor: 'secondary.main', color: 'primary.main'  }} variant='contained' endIcon={<CalculateIcon />}>Finanzieren</Button>
                  <Typography variant='h6' component='h2' sx={{ color: 'primary.main', fontFamily: fontBold, display: 'flex', justifyContent: 'center' }}>{seperateThousand(550)} {" €"}</Typography>
                  
                </Box>
              </Grid>
                     <Grid item xs={12}>
                    <GreyHorizontalHR />
                    </Grid>

                    <Grid container sx={{ marginTop: COMPONENT_DISTANCE }}>
                        <Grid item xs={6}> <Box sx={{ display: 'flex' }}><FavoriteBorderIcon /></Box> </Grid>
                        <Grid item xs={6}> <Box sx={{ display: 'flex', justifyContent: 'end' }}> <ShareIcon /> </Box></Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )
}
