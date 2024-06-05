import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { URLs } from '../../../enums/URLs';
import { Box, CardMedia, Dialog, IconButton, Typography, useMediaQuery, } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AxiosDataImagesNames } from '../../../interfaces/IAxiosData';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
export interface CarImagesProps {
  id: number | null | string | undefined,
  multiple: boolean,
  isDetail?: boolean,
}

enum ArrowDirection {
  ARROW_DIRECTION_LEFT = 'left', ARROW_DIRECTION_RIGHT = 'right'
}

const CarImages: React.FC<CarImagesProps> = ({ id, multiple, isDetail }) => {

  const lgQuery = useMediaQuery('(min-width:1101px)');

  const [fetchImageNamesDone, setFetchImageNamesDone] = useState(false);
  const [fetchedImageInformations, setFetchedImageInformations] = useState<AxiosDataImagesNames[]>([]);

  const [imageSrc, setImageSrc] = useState<string[]>([]);

  const [succesFullDownloaded, setSuccessFullDownloaded] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if(lgQuery)
      setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const BigImage = () => {
    return <Dialog sx={{ '& .MuiDialog-paper': {
      width: '950px',
      maxWidth: 'none', 
    }, }}
    open={open}
    onClose={handleClose}>
      <CarouselComponent />
    </Dialog>
  }

  useEffect(() => {
    setSuccessFullDownloaded(false);
    const fetchImageNames = async () => {
      try {
        const response = await axios.get<AxiosDataImagesNames[]>(URLs.ORIGIN_SERVER + URLs.FETCH_IMAGENAMES + '/' + id, { withCredentials: true })
        setFetchedImageInformations(response.data);
        setFetchImageNamesDone(true);

      } catch (error) {
        console.log(error)
        setFetchImageNamesDone(false);
      }
    }

    const fetchImageName = async () => {
      try {
        const response = await axios.get<AxiosDataImagesNames[]>(URLs.ORIGIN_SERVER + URLs.FETCH_IMAGENAME + '/' + id, { withCredentials: true })
        setFetchedImageInformations(response.data);
        setFetchImageNamesDone(true);

      } catch (error) {
        console.log(error)
        setFetchImageNamesDone(false);
      }
    }

    if (multiple)
      fetchImageNames();
    else
      fetchImageName();
  }, [id])

  useEffect(() => {
    const fetchImages = async () => {
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
        setSuccessFullDownloaded(true);
      } catch (error) {
        console.error('Fehler beim Herunterladen der Bilder:', error);
      } finally {
        setFetchImageNamesDone(false);
      }
    };
    if (fetchImageNamesDone)
      fetchImages();

  }, [fetchImageNamesDone])

  const CarouselComponent = () => {
    const iconButtonSX = (side: number) => ({
      [side === 0 ? 'left' : 'right']: 0,
      position: 'absolute',
      top: '45%',
      borderRadius: '30px',
      marginLeft: '0.4rem',
      marginRight: '0.4rem',
      opacity: '70%',
      backgroundColor: 'black', color: 'primary.contrastText',
      '&:hover': { backgroundColor: 'primary.dark', color: 'white' },
      '@media print': { display: 'none' },
    });
    const [sliderIndex, setSliderIndex] = useState(1);

    const handleSliderIndex = (direction: ArrowDirection) => {

      if (direction === ArrowDirection.ARROW_DIRECTION_LEFT) {
        if (sliderIndex === 1)
          setSliderIndex(imageSrc.length)
        else
          setSliderIndex(sliderIndex - 1)
      } else {
        if (sliderIndex === imageSrc.length)
          setSliderIndex(1);
        else
          setSliderIndex(sliderIndex + 1);
      }
    }
    
    return (<Box sx={{ position: 'relative' }} onClick={() => { handleClickOpen()}}>

      <CardMedia
        component='img'
        image={imageSrc[sliderIndex - 1]}
        alt={"Bild"}
        sx={{ objectFit: 'cover', width: '100%', aspectRatio: 16/9, height: 'auto', '&:hover': { cursor:'pointer' } }}>
      </CardMedia>

      <Box sx={{ '@media print': { display: 'none' }, '@media screen': { display: isDetail ? 'block' : 'none' }, color:'white', position: 'absolute', top: '7%', marginRight: '0.4rem', backgroundColor: 'black',
        padding: '0.3rem 0.8rem', opacity: '70%', ['right']: 0 }}><Typography>{`${sliderIndex} / ${imageSrc.length}`}</Typography></Box>
      {imageSrc.length > 1 && <>
        <IconButton sx={iconButtonSX(0)} onClick={(e) => { e.stopPropagation(); handleSliderIndex(ArrowDirection.ARROW_DIRECTION_LEFT) }}><ArrowBackIosIcon /></IconButton>
        <IconButton sx={iconButtonSX(1)} onClick={(e) => { e.stopPropagation(); handleSliderIndex(ArrowDirection.ARROW_DIRECTION_RIGHT) }}><ArrowForwardIosIcon /></IconButton>
      </> 
      }
    </Box>
    )
  }

  

  return (<>
    {
    <Box sx={{ height: '100%' }}>
      { succesFullDownloaded && imageSrc.length > 0 ? (
        <CarouselComponent />
      ) : (
        <Box sx={{ backgroundColor: 'background.paper', display: 'flex', width: '100%', aspectRatio: 16 / 9, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <CameraAltIcon sx={{ color:'background.paper', fontSize: '8rem', height: '100%', aspectRatio: 16 / 9, }} />
        </Box>
      )}
    </Box>
}
    <BigImage />
    </>
  );
};

export default CarImages;