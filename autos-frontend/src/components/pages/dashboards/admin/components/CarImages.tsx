import { useEffect, useState } from 'react'
import axios from 'axios';
import { URLs } from '../../../../../../../autos-backend/src/enums/URLs';
import { Button, Slide } from '@mui/material';

const CarImages = () => {
  const [imagesToFetch, setImagesToFetch] = useState(['images1711549341635.jpg']);

  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  
  const fetchImages = async () => {
    setLoading(true);
    try {
      const fetchedImages = await Promise.all(
        imagesToFetch.map(async imageName => {
          const response = await axios.get(`${URLs.ORIGIN_SERVER}/uploads/2/${imageName}`, {
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
  
  if (loading) {
    return <p>loading...</p>;
  }
  
  return (
    <>
      <Button onClick={fetchImages}>Fetch Images</Button>
      <div>CarImages</div>
      {imageSrc.length > 0 ? (
        imageSrc.map((image, index) => (
          <div key={index}>
            <img width='400px' src={image} alt="Bild" />
          </div>
        ))
      ) : (
        <p>Lade Bild...</p>
      )}
    </>
  );
};

export default CarImages;

