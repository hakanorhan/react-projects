import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { Fab, Button, Box, Grid, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


import { notifyError, notifySuccess } from '../../../helper/toastHelper';
import { Toaster } from 'react-hot-toast';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import * as UploadInfo from '../../../constants/Images';
import { primaryColorMain } from '../../../themes/ThemeColor';
import { URLs } from '../../../../../autos-backend/src/enums/URLs';

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
  const [maxFiles, setMaxFiles] = useState<number>(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && e.target.files.length <= UploadInfo.Images.MAX_SIZE_IMAGE) {
      const selectedFiles = Array.from(e.target.files);
      setFiles([...files, ...selectedFiles]);
    } else {
      notifyError(`Es dürfen maximal ${UploadInfo.Images.MAX_SIZE_IMAGE} vorhanden sein`);
    }
  };


  useEffect(() => {
    console.log("Wird ausgeführtzzt!")
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

      const response = await axios.post(`${URLs.ORIGIN_SERVER}${URLs.UPLOAD}`, formData, {
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
    <Box sx={{ marginTop:'5rem', marginBottom:'5rem', textAlign:'center' }}>
    <label htmlFor="contained-button-file">
    <Fab sx={{ backgroundColor: primaryColorMain, color: 'white' }} component="span" aria-label="add">
      <AddIcon />
    </Fab>
    </label>
    </Box>
    {uploadStatus && (
      <div>
        {uploadStatus}
      </div>
    )}
  </Box>
  );
};

export default UploadImage;