import { Box, CardContent, Grid, Paper, Rating, Typography } from '@mui/material'
import React from 'react'
import { seperateThousand } from '../../../helper/helper';
import { AxiosPaper, AxiosPaperList } from '../../../../../autos-backend/src/interfaces/IAxiosData';
import CircleIcon from '@mui/icons-material/Circle';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { COMPONENT_DISTANCE, GreyHorizontalHR, GreyVerticalHR, paperFontSize } from '../../../themes/Theme';
import ShareIcon from '@mui/icons-material/Share';
import { ListTDescriptionComponent } from './ListTDescriptionComponent';

interface GridComponentProps {
    icon: JSX.Element,
    value: any
}

const paddingTopBottom = '0.5rem';

export const ShowFastPaper: React.FC<{ detailSearchValues: AxiosPaperList }> = ({ detailSearchValues }) => {

    const axiosPaper: AxiosPaper = {
        inseratId: detailSearchValues.inseratId, mileageKm: detailSearchValues.mileageKm, registrationMonth: detailSearchValues.registrationMonth,
        registrationYear: detailSearchValues.registrationYear, psPower: detailSearchValues.psPower, fuel: detailSearchValues.fuel, accident: detailSearchValues.accident, vehicleOwners: detailSearchValues.vehicleOwners, city: detailSearchValues.city
    };

    return (
        <>{/* backgroundColor:{ xs:'yellow', sm:'whitesmoke', md:'red', lg:'orange', xl:'whitesmoke', xxl: 'yellow' } */}
            <CardContent sx={{  }}>
                <Typography sx={{ fontFamily:'Poppins-Bold', fontWeight: 'bold' }} variant='h6' component='h1'>{detailSearchValues.brand} {detailSearchValues.model}</Typography>
                

                <Grid item xs={12}>
                    {/*<TDescriptionComponent detailSearchValues={axiosPaper} />
                     */}
                   
                    <ListTDescriptionComponent detailSearchValues={axiosPaper} />

                    <GreyHorizontalHR />
                    <Grid container >
                        <Grid item xs={5.5}>
                            <Box sx={{ paddingTop: paddingTopBottom, paddingBottom: paddingTopBottom }}>
                                <Typography variant='h6' component='h2' sx={{  color: 'blue', fontFamily:'Poppins-Bold', display: 'flex', justifyContent: 'center' }}>{seperateThousand(detailSearchValues.price)} {" €"}</Typography>
                                <Typography variant='body2' component='p' sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center'  }}>{"Preis"}</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={1}> <GreyVerticalHR /> </Grid>

                        <Grid item xs={5.5}>
                            <Box sx={{ paddingTop: paddingTopBottom, paddingBottom: paddingTopBottom }}>
                                <Typography variant='h6' component='h2' sx={{ color: 'blue', fontFamily:'Poppins-Bold', display: 'flex', justifyContent: 'center' }}>{seperateThousand(550)} {" €"}</Typography>
                                <Typography variant='body2' component='p' sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>{"Finanzierung"}</Typography>
                            </Box>
                        </Grid>

                    </Grid>
                    <GreyHorizontalHR />

                    <Grid container sx={{ marginTop: COMPONENT_DISTANCE }}>
                        <Grid item xs={6}> <Box sx={{ display: 'flex' }}><FavoriteBorderIcon /></Box> </Grid>
                        <Grid item xs={6}> <Box sx={{ display: 'flex', justifyContent: 'end' }}> <ShareIcon /> </Box></Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )
}
