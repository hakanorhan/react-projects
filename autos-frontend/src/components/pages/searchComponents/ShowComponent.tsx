import { Box, Grid, Rating, Typography } from '@mui/material'
import React from 'react'
import { seperateThousand } from '../../../helper/helper';
import { AxiosPaperList } from '../../../../../autos-backend/src/interfaces/IAxiosData';
import CircleIcon from '@mui/icons-material/Circle';

export const ShowComponent: React.FC<{ detailSearchValues: AxiosPaperList }> = ({ detailSearchValues }) => {
    
    const Cirlce = () => {
        return <CircleIcon sx={{ fontSize: 'inherit', transform: 'scale(0.4)', textAlign: 'center' }} />;
    }

    return (
        <Box>
            <Grid xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
                <Grid xs={9} item>
                    <h3 style={{ margin: '0px', padding: '0px', marginLeft: '0.5rem' }}>{detailSearchValues.brand} {detailSearchValues.model}</h3>
                </Grid>
                <Grid xs={3} item>
                    <h3 style={{ margin: '0px', padding: '0px', marginLeft: '0.5rem' }} > {seperateThousand(detailSearchValues.price)} € </h3>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <div style={{ display: 'flex', margin: '0.5rem' }}>
                        <div>
                            <Typography sx={{ whiteSpace: 'nowrap', fontSize: '0.9rem', color: 'primary.main', fontWeight: '300' }} display='inline-block' variant='h6' component='h2'> Technische Details </Typography>
                            <Typography sx={{ whiteSpace: 'nowrap' }} variant='subtitle2' component='p'>
                                <p> EZ {detailSearchValues.registrationMonth}/{detailSearchValues.registrationYear} <Cirlce /> {detailSearchValues.cartype} <Cirlce /> {seperateThousand(detailSearchValues.mileageKm)} KM <Cirlce /> {detailSearchValues.fuel}</p>
                                <p> {detailSearchValues.transmission} <Cirlce /> {seperateThousand(detailSearchValues.psPower)} PS </p>
                            </Typography>
                            
                            <Typography sx={{ whiteSpace: 'nowrap' }} variant='subtitle2' component='p'>
                                <p> {detailSearchValues.isCarDealer ? "Händler" : "Privatanbieter"}  <Rating sx={{ transform: 'scale(0.8)' }} name="read-only" value={3} readOnly /> </p>
                                <p> {detailSearchValues.city} {detailSearchValues.federalState} </p>
                            </Typography>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}
