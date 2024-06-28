import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react'
import { seperateThousand } from '../../../../helper/helper';
import { AxiosPaper, AxiosPaperList } from '../../../../interfaces/IAxiosData';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { COMPONENT_DISTANCE, GreyHorizontalHR } from '../../../../themes/Theme';
import { ListTDescriptionComponent } from './ListTDescriptionComponent';
import ShareComponent from '../../ShareComponent';

const ShowFastPaper: React.FC<{ detailSearchValues: AxiosPaperList }> = ({ detailSearchValues }) => {

    const axiosPaper: AxiosPaper = useMemo(() => {
        return {
            inseratId: detailSearchValues.inseratId, mileageKm: detailSearchValues.mileageKm, registrationMonth: detailSearchValues.registrationMonth,
        registrationYear: detailSearchValues.registrationYear, psPower: detailSearchValues.psPower, fuel: detailSearchValues.fuel,
        accident: detailSearchValues.accident, vehicleOwners: detailSearchValues.vehicleOwners, city: detailSearchValues.city, isCarDealer: detailSearchValues.isCarDealer
        }
    }, [ detailSearchValues ])
    

    return (
        <>
            <CardContent>
                
                <Box display={'flex'} width={'100%'}>
                <Typography sx={{ whiteSpace:'nowrap' }} variant='h5' component='h1'>{`${detailSearchValues.brand} ${detailSearchValues.model}`}</Typography>
                </Box>
                
                <Box display={'flex'}>
                <   Typography variant='h5' component='h2' sx={{ alignContent:'end', display: 'flex', justifyContent: 'center' }}>{seperateThousand(detailSearchValues.price)} {" €"}</Typography>
                </Box>    
                    <ListTDescriptionComponent detailSearchValues={axiosPaper} />
                    <Grid container >

                     <Grid item xs={12}>
                    <GreyHorizontalHR />
                    </Grid>

                    <Grid container sx={{ marginTop: COMPONENT_DISTANCE }}>
                        <Grid item xs={6}> <Box sx={{ display: 'flex' }}><FavoriteBorderIcon sx={{ fontSize:'1.5rem' }} /></Box> </Grid>
                        <Grid item xs={6}> <Box sx={{ display: 'flex', justifyContent: 'end' }}> <Box onClick={(e) => { e.stopPropagation() }}><ShareComponent showText={true} /> </Box></Box></Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )
}

export default ShowFastPaper;