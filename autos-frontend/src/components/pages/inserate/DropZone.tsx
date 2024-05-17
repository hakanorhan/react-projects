import axios from 'axios';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { URLs } from '../../../../../autos-backend/src/enums/URLs';
import { notifyError, notifySuccess } from '../../../helper/toastHelper';

import { Box, Button, Grid, Tooltip, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { COMPONENT_DISTANCE } from '../../../themes/ThemeColor';

interface UploadImagesProp {
    carId?: number
}

type FileWithPreview = File & {
    preview: string
}

const DropZone: React.FC<UploadImagesProp> = ({ carId }) => {

    // all uploaded files
    const [files, setFiles] = useState<FileWithPreview[]>([]);


    const uploadImage = async (acceptedFiles: File[]) => {
        // TODO: carId
        if (!acceptedFiles.length) { return }

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

    const onDrop = useCallback((acceptedFiles: File[]) => {

        if (acceptedFiles.length) {
            setFiles((previousFiles) => [
                ...previousFiles,
                ...acceptedFiles.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                ),
            ]);

            uploadImage(acceptedFiles);

        }

    }, []);

    const removeFile = useCallback((imagename: string) => {

        // axios
        async function deleteImage() {
            const inserateid = carId;

            try {
                const response = await axios.delete(URLs.ORIGIN_SERVER + URLs.DELETE_IMAGE + `/${inserateid}/${imagename}`, { withCredentials: true })
            } catch (error) {

            }
        }

        deleteImage();
        
        setFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter(file => file.name !== imagename);
            prevFiles.forEach(file => {
                if (file.name === imagename) {
                    URL.revokeObjectURL(file.preview);
                }
            });
            return updatedFiles;
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    return (
        <Box>
            <Grid container>
                <Grid item xs={12} sm={6} md={4} lg={3}
                {...getRootProps()}
                sx={{
                    marginTop: '20px',
                    color: 'primary.main',
                    border: '2px dashed',
                    padding: '20px',
                    height:'400px',
                    textAlign: 'center',
                    background: isDragActive ? '#e0f7fa' : 'transparent',
                }}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <Typography variant='body1' component='p'>{"Ziehen Sie die Bilder hierher."}</Typography>
                ) : (
                    <Typography variant='body1' component='p'>{"Ziehen Sie die gewünschten Bilder hierher oder klicken Sie um Bilder auszuwählen."}</Typography>
                )}
                </Grid>
            </Grid>
            <Box>
                <Typography sx={{ textAlign:'center', paddingTop: '3rem' }} variant='body1' component='p'>Bereits hochgeladene Bilder.</Typography>
                <Grid container columnSpacing={2} sx={{ paddingTop: COMPONENT_DISTANCE, paddingBottom: COMPONENT_DISTANCE }}>
                    {files.map((file, index) => (
                        <Grid item xs={12} key={index} sx={{ position:'relative' }}>
                            <img
                                src={file.preview}
                                alt="preview"
                                onLoad={() => URL.revokeObjectURL(file.preview)}
                                style={{ width:'100%', aspectRatio: 4 / 3 }}
                            />
                            <Tooltip title="Bild entfernen">
                            <Button onClick={() => removeFile(file.name)} sx={{ position:'absolute', zIndex:10, left:'45%',borderRadius:'50%', width:'60px', top:'42%', height:'60px', backgroundColor: 'primary.main', color: 'primary.contrastText', '&:hover': { backgroundColor: 'primary.dark' } }}><DeleteOutlineIcon  /></Button>
                            </Tooltip>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default DropZone;
