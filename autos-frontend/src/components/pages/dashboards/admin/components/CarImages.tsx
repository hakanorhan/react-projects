import { useEffect, useState } from 'react'
import axios from 'axios';
import { URLs } from '../../../../../../../autos-backend/src/enums/URLs';
import { Box, IconButton, } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ImageCar, primaryColorMain, secondaryColorLight } from '../../../../../themes/ThemeColor';
import { AxiosDataImagesNames } from '../../../../../../../autos-backend/src/interfaces/IAxiosData';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

 export interface CarImagesProps {
  id: number | null | string | undefined
}
const CarImages: React.FC<CarImagesProps> = ({ id }) => {

  const [fetchImageNamesDone, setFetchImageNamesDone] = useState(false);
  const [fetchedImageInformations, setFetchedImageInformations] = useState<AxiosDataImagesNames[]>([]);

  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [succesFullDownloaded, setSuccessFullDownloaded] = useState(false);

  useEffect(() => {
    setSuccessFullDownloaded(false);
    const fetchImageNames = async() => {
      try {
      const response = await axios.get<AxiosDataImagesNames[]>(URLs.ORIGIN_SERVER + URLs.FETCH_IMAGENAMES +'/' + id, { withCredentials: true })
      setFetchedImageInformations(response.data);
        setFetchImageNamesDone(true);
        
    } catch(error) {
        console.log(error)
      }
    }

    fetchImageNames();
  }, [id])

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
        setSuccessFullDownloaded(true)
      } catch (error) {
        console.error('Fehler beim Herunterladen der Bilder:', error);
      } finally {
        setLoading(false);
        setFetchImageNamesDone(false);
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
      marginLeft: '0.4rem',
      marginRight: '0.4rem',
      opacity: '75%',
      backgroundColor: 'primary.main', color: 'primary.contrastText',
      '&:hover': { backgroundColor: 'primary.dark', color:'white' }
    });
    const [sliderIndex, setSliderIndex] = useState(0);

    return (<>
      <Box sx={{ position: 'relative'}}>
        { imageSrc.length > 1 ?<>
      <IconButton sx={ iconButtonSX(0) } onClick={() => { sliderIndex === imageSrc.length - 1 ? setSliderIndex(0) : setSliderIndex(sliderIndex + 1) }}><ArrowBackIosIcon /></IconButton>
      <IconButton sx={ iconButtonSX(1) } onClick={() => { sliderIndex === 0 ? setSliderIndex(imageSrc.length - 1) : setSliderIndex(sliderIndex - 1) }}><ArrowForwardIosIcon /></IconButton>
        </>   :<></>
      }
      <ImageCar src={imageSrc[sliderIndex]} alt="Bild" />
    </Box>
    </>
    )
  }


  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      {succesFullDownloaded && imageSrc.length > 0 ? <SliderComponent /> : (
        <Box sx={{ display:'flex', width:'100%', height:'100%', justifyContent:'center', alignItems:'center' }}><CameraAltIcon  sx={{ transform:'scale(1.5)' }}/> </Box>
      )}
    </Box>
  );
};

export default CarImages;