import axios from 'axios';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { URLs } from '../../../../../autos-backend/src/enums/URLs';
import { notifyError, notifySuccess } from '../../../helper/toastHelper';

import { Box, Button, Grid, Tooltip, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { COMPONENT_DISTANCE } from '../../../themes/Theme';
import { keyframes } from '@mui/material';

import FileUploadIcon from '@mui/icons-material/FileUpload';

interface UploadImagesProp {
    carId?: number
}

type FileWithPreview = File & {
    preview: string
}

const blink = keyframes`
0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const MAX_FILES = (20);

const DropZone: React.FC<UploadImagesProp> = ({ carId }) => {

    // all uploaded files
    const [files, setFiles] = useState<FileWithPreview[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {

        // TODO: if maxsize then message
        if (acceptedFiles?.length) {
            setFiles((previousFiles) => [
                ...previousFiles,
                ...acceptedFiles.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                ),
            ]);

            uploadImage(acceptedFiles);

        }

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone(
        {
            disabled: files.length >= MAX_FILES,
            onDrop, maxFiles: MAX_FILES, accept: { 'image/*': [] }
        });

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])

    const uploadImage = async (acceptedFiles: File[]) => {
        // TODO: carId
        if (!acceptedFiles.length) { return alert("Fehler") }

        if (carId)
            try {
                const formData = new FormData();
                // image folder id
                const stringId: string = carId?.toString();

                formData.append('carId', stringId);
                acceptedFiles.forEach(file => {
                    formData.append('images', file)
                });

                const response = await axios.post(URLs.ORIGIN_SERVER + URLs.UPLOAD, formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if (response.status === 200) {
                    notifySuccess("upload success", "Bild erfolgreich hochgeladen");
                } else alert("Fehler beim hochladen")

            } catch (error: any) {
                console.log("Zeile: 46 DropZone" + error);
            }
    }
    const removeFile = (imagename: string) => {

        const inserateid = carId;
        async function deleteImage() {
            try {
                const response = await axios.delete(URLs.ORIGIN_SERVER + URLs.DELETE_IMAGE + `/${inserateid}/${imagename}`, { withCredentials: true })
                setFiles(files => files.filter(file => file.name !== imagename));
            } catch (error) {

            }
        }
        deleteImage();
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box

                {...getRootProps()}
                sx={{
                    marginTop: '20px',
                    color: 'primary.main',
                    border: '2px dashed',
                    borderRadius: '20px',
                    padding: '20px',
                    height: '300px',
                    textAlign: 'center',
                    background: isDragActive ? '#e0f7fa' : 'whitesmoke',
                    width: { xs: '100%' },
                }}
            >
                < FileUploadIcon
                    sx={{
                        animation: `${blink} 3s infinite`,
                        fontSize: '200px',
                        color: 'primary.main',
                        zIndex: 1,
                        margin: 'auto',
                    }}
                />
                <input {...getInputProps()} />
                {isDragActive ? (
                    <Typography variant='body1' component='p'>{"Ziehen Sie die Bilder hierher."}</Typography>
                ) : (
                    <Typography variant='body1' component='p'>{
                        files.length < MAX_FILES
                            ? "Ziehen Sie die gewünschten Bilder hierher oder klicken Sie hier um Bilder auszuwählen."
                            : "Sie haben die maximale Anzahl von " + MAX_FILES + " Bildern  erreicht."
                    }</Typography>
                )}
            </Box>


            <Box>
                <Grid container columnSpacing={0.5} sx={{ margin: 'auto', width: '100%', paddingTop: COMPONENT_DISTANCE, paddingBottom: COMPONENT_DISTANCE }}>
                    {files.map((file) => (
                        <Grid item xs={12} lg={4} key={file.name} sx={{ position: 'relative' }}>
                            <img
                                src={file.preview}
                                alt={file.name}
                                style={{ width: '100%', aspectRatio: 1.78, objectFit: 'cover' }}
                            />
                            <Tooltip title="Bild entfernen">
                                <Button onClick={() => removeFile(file.name)} sx={{ position: 'absolute', zIndex: 10, left: '45%', borderRadius: '50%', width: '60px', top: '42%', height: '60px', backgroundColor: 'primary.main', color: 'primary.contrastText', '&:hover': { backgroundColor: 'primary.dark' } }}><DeleteOutlineIcon /></Button>

                            </Tooltip>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Box>
    );
}

export default DropZone;
