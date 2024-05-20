import React from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  Grid,
  Rating,
  IconButton,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SpeedIcon from '@mui/icons-material/Speed';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import SettingsIcon from '@mui/icons-material/Settings';

const car = {
  id: 1,
  make: 'Toyota',
  model: 'Corolla',
  year: 2022,
  transmission: 'Automatic',
  price: '$20,000',
  mileage: '10,000 miles',
  city: 'New York',
  interior: 'Leather',
  rating: 4,
  power: '150 HP',
  seller: 'dealer',
  images: [
    'https://via.placeholder.com/1280x720',
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/400x300',
  ],
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function CarDetail() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {car.make} {car.model} - {car.year}
      </Typography>
      <Rating name="car-rating" value={car.rating} readOnly />

      <Box sx={{ my: 3 }}>
          {car.images.map((image, index) => (
            <Box key={index} sx={{ height: '400px' }}>
              <img
                src={image}
                alt={`${car.make} ${car.model} - ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}
      </Box>

      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="div" gutterBottom>
                Price: {car.price}
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <DirectionsCarIcon fontSize="small" style={{ marginRight: 4 }} />
                <Typography variant="body1" color="textSecondary">
                  Mileage: {car.mileage}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOnIcon fontSize="small" style={{ marginRight: 4 }} />
                <Typography variant="body1" color="textSecondary">
                  City: {car.city}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <SpeedIcon fontSize="small" style={{ marginRight: 4 }} />
                <Typography variant="body1" color="textSecondary">
                  Power: {car.power}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <SettingsIcon fontSize="small" style={{ marginRight: 4 }} />
                <Typography variant="body1" color="textSecondary">
                  Transmission: {car.transmission}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                {car.seller === 'private' ? (
                  <PersonIcon fontSize="small" style={{ marginRight: 4 }} />
                ) : (
                  <StoreIcon fontSize="small" style={{ marginRight: 4 }} />
                )}
                <Typography variant="body1" color="textSecondary">
                  {car.seller === 'private' ? 'Privatanbieter' : 'Händler'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" component="div" gutterBottom>
                Technical Details
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Interior: {car.interior}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

function App() {
  return (

      <Container style={{ paddingTop: 20, paddingBottom: 20 }}>
        <CarDetail />
      </Container>
  );
}

export default App;
