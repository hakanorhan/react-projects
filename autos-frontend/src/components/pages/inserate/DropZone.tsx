import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
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

const MAX_FILES = (7);
const MAX_IMAGE_SIZE = 1024 * 1024 * 10;

const DropZone: React.FC<UploadImagesProp> = ({ carId }) => {

    // all uploaded files
    const [files, setFiles] = useState<FileWithPreview[]>([]);

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if(rejectedFiles.length > 0) {
            rejectedFiles.map(({ errors }) => (
                errors.map(e => {
                    if(e.code === 'file-too-large') {
                        notifyError(e.code, `Die maximale Größe pro Bild beträgt ${MAX_IMAGE_SIZE / 1024 / 1024} MB`)
                    } else if('too-many-files') {
                        notifyError(e.code, "Sie dürfen maximal " + (MAX_FILES) + " Bilder hochladen")
                    }
                })
            )) 
        } else 
        uploadImage(acceptedFiles);

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone(
        {
            disabled: files.length >= MAX_FILES,
            onDrop,
            maxFiles: MAX_FILES, 
            maxSize: MAX_IMAGE_SIZE,
            accept: { 'image/*': [] }
        });

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])

    const uploadImage = async (acceptedFiles: File[]) => {
        
        if (!acceptedFiles.length) { return  }

        const renamedFiles = acceptedFiles.map((file) => {
            const encodedFileName = encodeURI(file.name);
            return new File([file], encodedFileName, { type: file.type });
        });

        
        if (carId)
            try {
                const formData = new FormData();
                // image folder id
                const stringId: string = carId?.toString();

                formData.append('carId', stringId);
                renamedFiles.forEach(file => {
                    formData.append('images', file)
                });

                const response = await axios.post(URLs.ORIGIN_SERVER + URLs.UPLOAD, formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                const message = response.data.message;
                notifySuccess(message, message);


                // setFiles
                if (acceptedFiles?.length) {
                    setFiles((previousFiles) => [
                        ...previousFiles,
                        ...renamedFiles.map((file) =>
                            Object.assign(file, { preview: URL.createObjectURL(file) })
                        ),
                    ]);

                }

            } catch (error: any) {
                const message = error.response.data.message;
                notifyError(message, message);

            }
    }

    const removeFile = (imagename: string) => {
        const inserateid = carId;
        async function deleteImage() {
            try {
                const response = await axios.delete(URLs.ORIGIN_SERVER + URLs.DELETE_IMAGE + `/${inserateid}/${imagename}`, { withCredentials: true })
                setFiles(files => files.filter(file => file.name !== imagename));
                const message = response.data.message;
                notifySuccess(message, message);
            } catch (error: any) {
                const message = error.response.data.message;
                notifyError(message, message)
            }
        }
        deleteImage();
    }

    return (
        <>

            <Box sx={{ width: '100%' }}>
                <Box

                    {...getRootProps()}
                    sx={{
                        marginTop: '20px',
                        border: '2px dashed',
                        padding: '20px',
                        height: '300px',
                        textAlign: 'center',
                        background: isDragActive ? 'secondary.main' : 'background.default',
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
                    <Grid container columnGap ={0.5} sx={{ width: '100%', paddingTop: COMPONENT_DISTANCE, paddingBottom: COMPONENT_DISTANCE }}>
                        {files.map((file) => (
                            <Grid item xs={12} lg={3.95} key={file.name} sx={{ position: 'relative' }}>
                                <img
                                    src={file.preview}
                                    alt={file.name}
                                    style={{ width: '100%', aspectRatio: 1.78, objectFit: 'cover' }}
                                />
                                <Tooltip title="Bild entfernen">
                                    <Button onClick={() => removeFile(file.name)} sx={{ position: 'absolute', zIndex: 10, left: '45%', borderRadius: '50%', width: '60px', top: '30%', height: '60px', backgroundColor: 'primary.main', color: 'primary.contrastText', '&:hover': { backgroundColor: 'primary.dark' } }}><DeleteOutlineIcon /></Button>

                                </Tooltip>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Box>
        </>
    );
}

export default DropZone;
