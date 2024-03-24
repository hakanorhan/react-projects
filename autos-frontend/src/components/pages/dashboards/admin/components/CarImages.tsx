import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { URLs } from '../../../../../../../autos-backend/src/enums/URLs';

export default function CarImages() {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`${URLs.ORIGIN_SERVER}/uploads/images`, {
          responseType: 'blob',
          withCredentials: true
        });

        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Fehler beim Herunterladen des Bildes:', error);
      }
    };

    fetchImage();

    return () => {
      URL.revokeObjectURL(imageSrc); // URL freigeben, um Speicherleck zu verhindern
    };
  }, []);

  
  return (
    <>
      <div>CarImages</div>
      {imageSrc ? (
        <img width='400px' src={imageSrc} alt="Bild" />
      ) : (
        <p>Lade Bild...</p>
      )}
    </>
  )
}

