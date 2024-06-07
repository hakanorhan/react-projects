import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { URLs } from '../../enums/URLs'
import { scrollToTop } from '../../helper/PagerHelper'

export default function AccessDenied() {
  
  scrollToTop();
  return (
    <Box sx={{ display:'column', backgroundColor:'primary.main', height: '100vh' }}>
    <Typography color={'primary.contrastText'} paddingTop={'20%'} align="center" variant={'h4'} component={'p'}>{"403 Zugriff verweigert. Sie haben keine Berechtigung, diese Seite zu besuchen"}</Typography>
    <Box textAlign={'center'}><Link style={{ textDecoration:'none' }} to={URLs.HOME_ALL_SEARCH_COUNT}><Typography color={'primary.contrastText'} variant="h2">{"Zur Homeseite"}</Typography></Link></Box>
  </Box>
  )
}
