import { Box } from "@mui/material"

import { grey } from '@mui/material/colors';
const blackColor = grey[900];

export default function Home() {
  return (
      <Box width={1} style={{
        height: '350px', 
      background: 'url(home.jpg)', objectFit:'cover', backgroundRepeat:'no-repeat' }}>
        <h1 style={{ textAlign:'center', color:blackColor, paddingTop: '75px' }}>Find your next car.</h1>
      </Box>     
  )
}
