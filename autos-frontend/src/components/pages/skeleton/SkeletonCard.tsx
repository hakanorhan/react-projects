import { Box, Card, CardActionArea, Grid, colors } from '@mui/material'
import { COMPONENT_DISTANCE, ZOOM_HOVER } from '../../../themes/Theme'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ShowFastPaper } from '../search/searchComponents/ShowFastPaper'
import { AxiosPaperList } from '../../../interfaces/IAxiosData'

export default function SkeletonCard() {

    const axiosPaper: AxiosPaperList = {
        inseratId: -1,
        brand: "",
        model: "",
        price: 0,
        mileageKm: 0,
        registrationYear: 0,
        registrationMonth: 0,
        psPower: 0,
        fuel: "",
        accident: false,
        transmission: "",
        city: "Gelsenkirchen",
        cartype: "",
        federalState: "",
        isCarDealer: false,
        vehicleOwners: 0
    }

    return <>
    <Box sx={{ display:'block', width: '95%', margin: 'auto', paddingTop: '20px', marginBottom: COMPONENT_DISTANCE }}>
        <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <Card elevation={1} sx={ZOOM_HOVER}>
                    <CardActionArea>

                        <Box sx={{ backgroundColor: colors.yellow[900], display: 'flex', width: '100%', aspectRatio: 16 / 9, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <CameraAltIcon sx={{ fontSize: '8rem', height: '100%', aspectRatio: 16 / 9, }} />
                        </Box>

                        {/* technical description */}
                        <ShowFastPaper detailSearchValues={axiosPaper} />

                    </CardActionArea>
                </Card>

            </Grid>
            </Grid>
            </Box>
        </>
  
}
