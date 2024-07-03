import React, { Dispatch, SetStateAction, memo, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { URLs } from '../../../constants/values';
import { keyframes, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NoImage from '/noimage.png';
import { AxiosDataImagesNames } from '../../../interfaces/IAxiosData';
export interface CarImagesProps {
  id: number | null | string | undefined,
  multiple: boolean,
  isDetail?: boolean,
  setImageIsLoaded?: Dispatch<SetStateAction<boolean>>
}

enum ArrowDirection {
  ARROW_DIRECTION_LEFT = 'left', ARROW_DIRECTION_RIGHT = 'right'
}

const CarImages: React.FC<CarImagesProps> = ({ id, multiple, isDetail, setImageIsLoaded }) => {

  const lgQuery = useMediaQuery('(min-width:1101px)');

  const [fetchImageNamesDone, setFetchImageNamesDone] = useState<null | Boolean>(null);
  const [fetchedImageInformations, setFetchedImageInformations] = useState<AxiosDataImagesNames[]>([]);

  const [imageSrc, setImageSrc] = useState<string[]>([]);

  const [open, setOpen] = useState(false);

  const handleImageLoading = () => {

    setTimeout(() => {
      if (setImageIsLoaded)
        setImageIsLoaded(true);
      setFetchImageNamesDone(false);
    }, 500);
  }

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
      setFetchImageNamesDone(false);
      if (setImageIsLoaded)
        setTimeout(() => {
      setImageSrc(['cars.de-noImage'])
          setImageIsLoaded(true);
        }, 500)
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
        console.log("Wirst du ausgeführt?")
        const fetchedImages = await Promise.all(
          fetchedImageInformations.map(async imageInfo => {
            const response = await axios.get(`${URLs.ORIGIN_SERVER}/uploads/${id}/${imageInfo.imagename}`, {
              responseType: 'blob',
              withCredentials: true
            });
            return URL.createObjectURL(response.data);
          })
        );
          if(fetchedImages[0] !== undefined) {
            setImageSrc(fetchedImages);
          } else {
            console.log("is not defined!")
            const noImage = ['cars.de-noImage'];
            setImageSrc(noImage);
          }
        
      } catch (error) {
        console.log("file not found!")
      } finally {
        handleImageLoading();
      }
    };
    if (fetchImageNamesDone && imageSrc[0] !== 'cars.de-noImage')
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

    return (<div style={{ position: 'relative' }} onClick={() => { handleClickOpen() }}>

      <CardMedia
        loading='lazy'
        component='img'
        image={imageSrc[0] === 'cars.de-noImage' ? NoImage : imageSrc[sliderIndex - 1]}
        sx={{ objectFit: 'cover', width: '100%', aspectRatio: 16 / 9, height: 'calc(100% * 9 / 16)', '&:hover': { cursor: { xs: 'default', lg: open ? 'default' : 'zoom-in' } } }}>
      </CardMedia>

      {!fetchImageNamesDone &&
        <>
          <Box sx={{
            '@media print': { display: 'none' }, '@media screen': { display: { xs: isDetail ? imageSrc.length === 0 ? 'none' : 'block' : 'none' } }, color: 'white', position: 'absolute', top: '7%', marginRight: '0.4rem', backgroundColor: 'black',
            padding: '0.3rem 0.8rem', opacity: '70%', ['right']: 0, cursor: { xs: 'default', lg: open ? 'default' : 'zoom-in' }
          }}>
            <Typography sx={{ color:'white' }}>{`Bild ${sliderIndex} von ${imageSrc.length}`}</Typography>

            </Box>

          {imageSrc.length > 1 && <>
            <IconButton sx={iconButtonSX(0)} onClick={(e) => { e.stopPropagation(); handleSliderIndex(ArrowDirection.ARROW_DIRECTION_LEFT) }}><ArrowBackIosIcon /></IconButton>
            <IconButton sx={iconButtonSX(1)} onClick={(e) => { e.stopPropagation(); handleSliderIndex(ArrowDirection.ARROW_DIRECTION_RIGHT) }}><ArrowForwardIosIcon /></IconButton>
          </>
          }
        </>
      }
    </div>
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
  }, [id]);

  const skeletonLoading = keyframes`
    0% {
      background-color: hsl(200, 20%, 80%);
    }
    100% {
      background-color: hsl(200, 20%, 95%);
    }
  `;

  return (<>

    <Box ref={imageRef} sx={{ backgroundColor:'#COCOCO', animation: fetchImageNamesDone ? `${skeletonLoading} 1s linear infinite alternate` : ``, width: '100%', height: 'calc(100% * 9 / 16)' }}>
      {!fetchImageNamesDone ?
        <CarouselComponent />
        : <Box sx={{ backgroundColor:'#COCOCO', objectFit: 'cover', width: '100%', aspectRatio: 16 / 9, height: 'calc(100% * 9 / 16)' }}>
        </Box>
      }
    </Box>
    <BigImage />
  </>
  );
};

export default memo(CarImages);