import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AirportShuttle from '@mui/icons-material/AirportShuttle';
const Logo = () => {
  return (
    <IconButton
      color="primary"
      size="large"
      sx={{
        borderRadius: '0px',
        padding: '20px',
        backgroundColor: 'grey',
        width:'120px' 
      }}
    >
      <AirportShuttle
        fontSize="large"
        color="secondary" 
        style={{
          transform: 'rotate(45deg)',
        }}
      />
        <Typography color='secondary.main' variant='body1'>Hallo</Typography>
      
    </IconButton>
  );
};

export default Logo;