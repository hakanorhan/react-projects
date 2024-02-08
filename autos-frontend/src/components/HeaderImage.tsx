import React from 'react';
import {
    Card,
    CardMedia,
    Box
} from '@mui/material';

export interface ImageData {
    imageUrl: string,
    title: string,
    borderRadius: number,
    height: string
}

export interface TextData {
    h1Text: string,
    h2Text?:string,
    paddingTop: string,
    color: string
}

type PropsData = {
    imageData: ImageData,
    textData: TextData
}

const HeaderImage:React.FC<PropsData> =({ imageData, textData }) => {
  return (
    <Card sx={{ borderTopLeftRadius:`${imageData.borderRadius}rem`, borderBottomLeftRadius:`${imageData.borderRadius}rem`}}>
          <CardMedia sx={{ objectFit:'cover', borderTopLeftRadius:`${imageData.borderRadius}rem`, borderBottomLeftRadius:`${imageData.borderRadius}rem`, height: imageData.height}}
            image= {`${imageData.imageUrl}.jpg`}
            title= {imageData.title}
          >
            <Box sx={{ paddingTop:textData.paddingTop , textAlign:'center', color:textData.color }}>
              <h1>{textData.h1Text}</h1>
              <h1>{textData.h2Text}</h1>
            </Box>
          </CardMedia>
        </Card>
  )
}

export default HeaderImage;