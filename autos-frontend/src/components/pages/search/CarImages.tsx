import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { URLs } from '../../../constants/values';
import { Box, CardMedia, Dialog, IconButton, Typography, useMediaQuery, } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AxiosDataImagesNames } from '../../../interfaces/IAxiosData';
export interface CarImagesProps {
  id: number | null | string | undefined,
  multiple: boolean,
  isDetail?: boolean
}

enum ArrowDirection {
  ARROW_DIRECTION_LEFT = 'left', ARROW_DIRECTION_RIGHT = 'right'
}

const CarImages: React.FC<CarImagesProps> = ({ id, multiple, isDetail }) => {

  const lgQuery = useMediaQuery('(min-width:1101px)');

  const [fetchImageNamesDone, setFetchImageNamesDone] = useState(false);
  const [fetchedImageInformations, setFetchedImageInformations] = useState<AxiosDataImagesNames[]>([]);

  const [imageSrc, setImageSrc] = useState<string[]>([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (lgQuery)
      setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const BigImage = () => {
    return <Dialog sx={{
      '& .MuiDialog-paper': {
        width: '950px',
        maxWidth: 'none',
      },
    }}
      open={open}
      onClose={handleClose}>
      <CarouselComponent />
    </Dialog>
  }

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

    return (<Box sx={{ position: 'relative' }} onClick={() => { handleClickOpen() }}>
      
      <CardMedia 
        loading='lazy'
        component='img'
        image={imageSrc[sliderIndex - 1]}
        sx={{ objectFit: 'cover', width: '100%', aspectRatio: 16 / 9, height: 'calc(100% * 9 / 16)', '&:hover': { cursor: { xs: 'default', lg: open ? 'default' :'zoom-in' } } }}>
      </CardMedia>

      <Box sx={{
        '@media print': { display: 'none' }, '@media screen': { display: { xs: isDetail ? 'flex' : 'none' } }, color: 'white', position: 'absolute', top: '7%', marginRight: '0.4rem', backgroundColor: 'black',
        padding: '0.3rem 0.8rem', opacity: '70%', ['right']: 0, cursor: {xs: 'default', lg: open ? 'default' :'zoom-in'}
      }}>
        <Typography>{`Bild ${sliderIndex} von ${imageSrc.length}`}</Typography>
        </Box>
        
      {imageSrc.length > 1 && <>
        <IconButton sx={iconButtonSX(0)} onClick={(e) => { e.stopPropagation(); handleSliderIndex(ArrowDirection.ARROW_DIRECTION_LEFT) }}><ArrowBackIosIcon /></IconButton>
        <IconButton sx={iconButtonSX(1)} onClick={(e) => { e.stopPropagation(); handleSliderIndex(ArrowDirection.ARROW_DIRECTION_RIGHT) }}><ArrowForwardIosIcon /></IconButton>
      </>
      }
    </Box>
    )
  }

  const imageRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {


          if (multiple)
            fetchImageNames();
          else
            fetchImageName();

          observer.disconnect();
        }
      });
    }, options);

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [ id ]);

  return (<>


    <Box ref={imageRef} sx={{ width: '100%', height: 'calc(100% * 9 / 16)' }}>

        <CarouselComponent />
      

    </Box>

    <BigImage />
  </>
  );
};

export default CarImages;