import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { URLs } from '../../constants/values'
import { scrollToTop } from '../../helper/helper'

export default function AccessDenied() {

  scrollToTop();
  return (
    <Box sx={{ display: 'column', backgroundColor: 'primary.main', height: '100vh' }}>
      <Typography color={'primary.contrastText'} paddingTop={'20%'} align="center" variant={'h4'} component={'p'}>{"403 Zugriff verweigert. Sie haben keine Berechtigung, diese Seite zu besuchen"}</Typography>
      <Box textAlign={'center'}><Link style={{ textDecoration: 'none' }} to={URLs.HOME_ALL_SEARCH_COUNT}><Typography color={'primary.contrastText'} variant="h2">{"Zur Homeseite"}</Typography></Link></Box>
    </Box>
  )
}
