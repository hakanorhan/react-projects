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
            <CardContent sx={{ backgroundColor:'backgound.paper' }}>
                
                <Typography sx={{ whiteSpace:'nowrap', fontWeight: 'bold' }} variant='h5' component='h1'>{`${detailSearchValues.brand} ${detailSearchValues.model}`}</Typography>
                
                <Typography variant='h5' component='h2' sx={{ fontWeight:'bold', marginBottom: COMPONENT_DISTANCE}}>{seperateThousand(detailSearchValues.price)} {" €"}</Typography>
                  
                    <ListTDescriptionComponent detailSearchValues={axiosPaper} />
                    <div style={{ marginTop: COMPONENT_DISTANCE }}>
                    <GreyHorizontalHR />
                    </div>
                    <Grid container sx={{ marginTop: COMPONENT_DISTANCE }}>
                        <Grid item xs={6}> <Box sx={{ display: 'flex' }}><FavoriteBorderIcon sx={{ fontSize:'1.5rem' }} /></Box> </Grid>
                        <Grid item xs={6}> <Box sx={{ display: 'flex', justifyContent: 'end' }}> <Box onClick={(e) => { e.stopPropagation() }}><ShareComponent showText={true} /> </Box></Box></Grid>
                    </Grid>
                
            </CardContent>
        </>
    )
}

export default ShowFastPaper;