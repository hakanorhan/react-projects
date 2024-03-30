import { useEffect, useState } from 'react'
import axios from 'axios';
import { URLs } from '../../../../../../../autos-backend/src/enums/URLs';
import { Box, IconButton, } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ImageCar, primaryColorMain, secondaryColorLight } from '../../../../../themes/ThemeColor';
import { AxiosDataImagesNames } from '../../../../../../../autos-backend/src/interfaces/IAxiosData';

interface CarImagesProps {
  id: number | null
}
const CarImages: React.FC<CarImagesProps> = ({ id }) => {

  const [fetchImageNamesDone, setFetchImageNamesDone] = useState(false);
  const [fetchedImageInformations, setFetchedImageInformations] = useState<AxiosDataImagesNames[]>([]);

  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImageNames = async() => {
      try {
      const response = await axios.get<AxiosDataImagesNames[]>(`${URLs.ORIGIN_SERVER}${URLs.FETCH_IMAGENAMES}/${id}`, { withCredentials: true })
        setFetchedImageInformations(response.data);
        setFetchImageNamesDone(true);
    } catch(error) {
        console.log(error)
      }
    }

    fetchImageNames();
  }, [])

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const fetchedImages = await Promise.all(
          fetchedImageInformations.map(async imageInfo => {
            const response = await axios.get(`${URLs.ORIGIN_SERVER}/uploads/${id}/${imageInfo.imagename}`, {
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
    if(fetchImageNamesDone)
      fetchImages();

  }, [fetchImageNamesDone])


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

    return (<>
      <Box sx={{ position: 'relative'}}>
      <IconButton sx={ iconButtonSX(0) } onClick={() => { sliderIndex === imageSrc.length - 1 ? setSliderIndex(0) : setSliderIndex(sliderIndex + 1) }}><ArrowBackIosIcon /></IconButton>
      <IconButton sx={ iconButtonSX(1) } onClick={() => { sliderIndex === 0 ? setSliderIndex(imageSrc.length - 1) : setSliderIndex(sliderIndex - 1) }}><ArrowForwardIosIcon /></IconButton>
      <ImageCar src={imageSrc[sliderIndex]} alt="Bild" />
    </Box>
    </>
    )
  }


  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      {fetchImageNamesDone && imageSrc.length > 0 ? <SliderComponent /> : (
        <p>Lade Bild...</p>
      )}
    </>
  );
};

export default CarImages;