import { Box, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { seperateThousand } from '../../../../helper/helper';
import { AxiosPaper, AxiosPaperList } from '../../../../interfaces/IAxiosData';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { COMPONENT_DISTANCE, GreyHorizontalHR, fontBold } from '../../../../themes/Theme';
import { ListTDescriptionComponent } from './ListTDescriptionComponent';
import ShareComponent from '../../ShareComponent';

export const ShowFastPaper: React.FC<{ detailSearchValues: AxiosPaperList }> = ({ detailSearchValues }) => {

    const axiosPaper: AxiosPaper = {
        inseratId: detailSearchValues.inseratId, mileageKm: detailSearchValues.mileageKm, registrationMonth: detailSearchValues.registrationMonth,
        registrationYear: detailSearchValues.registrationYear, psPower: detailSearchValues.psPower, fuel: detailSearchValues.fuel,
        accident: detailSearchValues.accident, vehicleOwners: detailSearchValues.vehicleOwners, city: detailSearchValues.city, isCarDealer: detailSearchValues.isCarDealer
    };

    return (
        <>
            <CardContent>
                <Box display={'flex'} width={'100%'}>
                <Typography sx={{ fontFamily: fontBold, width:'50%' }} variant='h6' component='h1'>{detailSearchValues.brand} {detailSearchValues.model}</Typography>
                <Typography variant='h6' component='h2' sx={{ alignContent:'end', fontFamily: fontBold, display: 'flex', justifyContent: 'center' }}>{seperateThousand(detailSearchValues.price)} {" €"}</Typography>
                  
                </Box>
                    <ListTDescriptionComponent detailSearchValues={axiosPaper} />
                    <Grid container >

                     <Grid item xs={12}>
                    <GreyHorizontalHR />
                    </Grid>

                    <Grid container sx={{ marginTop: COMPONENT_DISTANCE }}>
                        <Grid item xs={6}> <Box sx={{ display: 'flex' }}><FavoriteBorderIcon /></Box> </Grid>
                        <Grid item xs={6}> <Box sx={{ display: 'flex', justifyContent: 'end' }}> <Box onClick={(e) => { e.stopPropagation() }}><ShareComponent showText={true} /> </Box></Box></Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )
}
