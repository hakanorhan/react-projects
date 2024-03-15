import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Button, Container, Grid } from '@mui/material';

import { notifyError, notifySuccess } from '../../helper/toastHelper';
import { Toaster } from 'react-hot-toast';

const UploadImage: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles([...files, ...selectedFiles]);
    }
  };

  const handleUpload = async () => {
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
  

  return (
    <Container>
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
      <Button variant="contained" color="primary" component="span">
        Choose Files
      </Button>
    </label>
    <Button
      variant="contained"
      color="primary"
      disabled={files.length === 0}
      onClick={handleUpload}
    >
      Upload
    </Button>
    <Grid container spacing={2}>
      {files.map((file, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <img src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
        </Grid>
      ))}
    </Grid>
    {uploadStatus && (
      <div>
        {uploadStatus}
      </div>
    )}
  </Container>
  );
};

export default UploadImage;