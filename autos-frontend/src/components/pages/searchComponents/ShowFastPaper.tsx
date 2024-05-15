import { Box, Grid, Paper, Rating, Typography } from '@mui/material'
import React from 'react'
import { seperateThousand } from '../../../helper/helper';
import { AxiosPaper, AxiosPaperList } from '../../../../../autos-backend/src/interfaces/IAxiosData';
import CircleIcon from '@mui/icons-material/Circle';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { COMPONENT_DISTANCE, GreyHorizontalHR, GreyVerticalalHR, paperFontSize } from '../../../themes/ThemeColor';
import { TDescriptionComponent } from './TDescriptionComponent';
import ShareIcon from '@mui/icons-material/Share';

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
        <>
            <Grid container sx={{ padding: '1rem' }}>
                <Grid xs={12} item>
                    <Typography variant='h5' component='h1'>{detailSearchValues.brand} {detailSearchValues.model}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <TDescriptionComponent detailSearchValues={axiosPaper} />
                    <GreyHorizontalHR />

                    <Grid container >
                        <Grid item xs={5.5}>
                            <Box sx={{ paddingTop: paddingTopBottom, paddingBottom: paddingTopBottom }}>
                                <Typography variant='h5' component='h2' sx={{ color: 'red', fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>{seperateThousand(detailSearchValues.price)} {" €"}</Typography>
                                <Typography component='p' sx={{ display: 'flex', justifyContent: 'center', fontSize: paperFontSize }}>{"Preis"}</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={1}> <GreyVerticalalHR /> </Grid>

                        <Grid item xs={5.5}>
                            <Box sx={{ paddingTop: paddingTopBottom, paddingBottom: paddingTopBottom }}>
                                <Typography variant='h5' component='h2' sx={{ color: 'red', fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>{seperateThousand(550)} {" €"}</Typography>
                                <Typography component='p' sx={{ display: 'flex', justifyContent: 'center', fontSize: paperFontSize }}>{"Finanzierung"}</Typography>
                            </Box>
                        </Grid>

                    </Grid>
                    <GreyHorizontalHR />

                    <Grid sx={{ marginTop: COMPONENT_DISTANCE, marginBottom: COMPONENT_DISTANCE }} container>
                        <Grid item xs={6}>
                            <Typography sx={{ fontSize: paperFontSize }} component='p'> {detailSearchValues.isCarDealer ? 'Händler' : 'Privatanbieter'} </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'end' }}><Rating sx={{ fontSize: '20px', verticalAlign: 'middle' }} name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly /> <Typography sx={{ fontSize: paperFontSize }}> {" (22)"}</Typography> </Box>
                        </Grid>
                        <Grid sx={{ marginTop: COMPONENT_DISTANCE }} item xs={12}>
                            <Box sx={{ display: 'flex' }}>
                                <LocationOnIcon /> <Typography sx={{ marginLeft: '0.5rem', fontSize: paperFontSize }} component='p'>{detailSearchValues.city}, {detailSearchValues.federalState}</Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <GreyHorizontalHR />

                    <Grid container xs={12} sx={{ marginTop: COMPONENT_DISTANCE }}>
                        <Grid item xs={6}> <Box sx={{ display: 'flex', justifyContent: 'start' }}><FavoriteBorderIcon /></Box> </Grid>
                        <Grid item xs={6}> <Box sx={{ display: 'flex', justifyContent: 'end' }}> <ShareIcon /> </Box></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
