import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { Button, Box, Grid, Tooltip } from '@mui/material';

import { notifyError, notifySuccess } from '../../helper/toastHelper';
import { Toaster } from 'react-hot-toast';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface UploadImagesProp {
    submitClicked: boolean
}

/**
 * imagename+id
 * @returns imagename
 */
const UploadImage: React.FC<UploadImagesProp> = ({ submitClicked }) => {
    const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles([...files, ...selectedFiles]);
    }
  };


  useEffect(() => {
    console.log("Wird ausgeführt!")
    if(submitClicked) {
        handleImageUpload();
    }
    
  }, [submitClicked])

   const handleImageUpload = async () => {
    if (files.length === 0) {
        notifyError('Keine Bilder ausgwählt.')
      return;
    }

    try {
      const formData = new FormData();
      files.forEach(file => formData.append('images', file));

      const response = await axios.post('http://localhost:3001/upload', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        notifySuccess('Erfolgreich hochgeladen.');
      } else {
        setUploadStatus('Fehler beim Hochladen aufgetreten.');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus('Fehler beim Hochladen aufgetreten.');
    }
  };

  const handleDeleteImage = (indexToRemove: number) => {
    setFiles(prevFies => prevFies.filter((_, index) => index !== indexToRemove))
  } 
  

  return (
    <Box>
        <Toaster />
    <input
      accept="image/*"
      id="contained-button-file"
      type="file"
      multiple
      style={{ display: 'none' }}
      onChange={handleFileChange}
    />
    <label htmlFor="contained-button-file">
      <Button fullWidth variant="contained" color="primary" component="span">
        Bild wählen
      </Button>
    </label>
    <Grid sx={{ marginTop:'0.4rem' }} container spacing={2}>
      {files.map((file, index) => (
        <Grid item xs={12} sm={12} md={6} lg={6} key={index} sx={{ position:'relative', width:'50%' }}>
          <img src={URL.createObjectURL(file)} alt={`Uploaded image ${index + 1}`} style={{ width: '100%', height:'100%' }} />
          <Tooltip title="Löschen">
          <Button onClick={() => { handleDeleteImage(index) }} sx={{ position:'absolute', top:'50%', left:'50%', height:'auto', opacity:'70%' }}><DeleteOutlineIcon sx={{ color:'white' }} /></Button>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
    {uploadStatus && (
      <div>
        {uploadStatus}
      </div>
    )}
  </Box>
  );
};

export default UploadImage;