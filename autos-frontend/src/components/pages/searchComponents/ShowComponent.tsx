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
        <>
            <Grid container>
                <Grid xs={12} item>
                    <h2 style={{ fontWeight:'lighter', marginBottom:'0.5rem' }}>{detailSearchValues.brand} {detailSearchValues.model}</h2>
                </Grid>
                <Grid xs={12} item>
                    <h1 style={{marginBottom:'0.5rem' }} > {seperateThousand(detailSearchValues.price)} € </h1>
                </Grid>
            
            
                <Grid item xs={12}>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <Typography sx={{ marginBottom:'0.3rem', whiteSpace: 'nowrap', fontSize: '0.9rem', color: 'primary.main', fontWeight: '300' }} display='inline-block' variant='h6' component='h2'> Technische Details </Typography>
                            <Typography sx={{ wordWrap:'normal' }} variant='body1' component='p'>
                                <Typography variant='body1' component='p'> EZ {detailSearchValues.registrationMonth}/{detailSearchValues.registrationYear} <Cirlce /> {detailSearchValues.cartype} <Cirlce /> {seperateThousand(detailSearchValues.mileageKm)} KM <Cirlce /> {detailSearchValues.fuel}
                                <Cirlce /> {detailSearchValues.transmission} <Cirlce /> {seperateThousand(detailSearchValues.psPower)} PS </Typography>
                            </Typography>
                            
                            <Typography sx={{ whiteSpace: 'nowrap' }} variant='subtitle1' component='p'>
                            <Typography sx={{ marginTop: '0.5rem' }}> {detailSearchValues.city} {detailSearchValues.federalState} </Typography>
                                <Typography sx={{ marginBottom:'0.7rem', marginTop:'0.5rem' }}> {detailSearchValues.isCarDealer ? "Händler" : "Privatanbieter"}  <Rating sx={{ transform: 'scale(0.8)' }} name="read-only" value={3} readOnly /> </Typography>
                                </Typography>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}
