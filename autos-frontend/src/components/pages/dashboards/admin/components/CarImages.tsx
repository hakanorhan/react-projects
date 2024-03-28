import { useEffect, useState } from 'react'
import axios from 'axios';
import { URLs } from '../../../../../../../autos-backend/src/enums/URLs';
import { Box, Button, IconButton, Slide } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { primaryColorMain, secondaryColorLight } from '../../../../../themes/ThemeColor';

const CarImages = () => {
  const [imagesToFetch, setImagesToFetch] = useState(['640px-Porsche_992_Carrera_S_coupe_IMG_5832.jpg', '640px-Porsche_992_Carrera_S_coupe_IMG_5831.jpg']);

  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const fetchedImages = await Promise.all(
          imagesToFetch.map(async imageName => {
            const response = await axios.get(`${URLs.ORIGIN_SERVER}/uploads/1/${imageName}`, {
              responseType: 'blob',
              withCredentials: true
            });
            return URL.createObjectURL(response.data);
          })
        );
        setImageSrc(fetchedImages);
      } catch (error) {
        console.error('Fehler beim Herunterladen der Bilder:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [])


  const SliderComponent = () => {
    const iconButtonSX = (side: number) => ({
      [side === 0 ? 'left' : 'right']: 0,
      height: 'auto',
      borderRadius: '30px',
      top: '45%',
      position: 'absolute',
      backgroundColor: secondaryColorLight,
      '&:hover': { backgroundColor: primaryColorMain, color:'white' }
    });
    const [sliderIndex, setSliderIndex] = useState(0);

    return (<><Box sx={{ position: 'relative', width: '100%' }}>
      <IconButton sx={ iconButtonSX(0) } onClick={() => { sliderIndex === imageSrc.length - 1 ? setSliderIndex(0) : setSliderIndex(sliderIndex + 1) }}><ArrowBackIosIcon /></IconButton>
      <IconButton sx={ iconButtonSX(1) } onClick={() => { sliderIndex === 0 ? setSliderIndex(imageSrc.length - 1) : setSliderIndex(sliderIndex - 1) }}><ArrowForwardIosIcon /></IconButton>
      <img width='100%' style={{ objectFit:'cover' }} src={imageSrc[sliderIndex]} alt="Bild" />
    </Box>
    </>
    )
  }


  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      {imageSrc.length > 0 ? <SliderComponent /> : (
        <p>Lade Bild...</p>
      )}
    </>
  );
};

export default CarImages;

/*
 {imageSrc.map((image, index) => (
                <div key={index}>
                    <img width='400px' src={image} alt="Bild" />
                </div>
            ))}
*/