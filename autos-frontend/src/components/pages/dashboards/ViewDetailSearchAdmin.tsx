import React from 'react'
import { URLs } from '../../../enums/URLs';
import axios from 'axios';
import { AxiosDataPublish } from '../../../interfaces/IAxiosData';
import { CarImagesProps } from '../search/CarImages';
import { Button, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Publish } from '@mui/icons-material';
import ViewDetailGeneral from '../search/viewDetail/ViewDetailGeneral';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { notifyError } from '../../../helper/toastHelper';

const ViewDetailSearchAdmin: React.FC<CarImagesProps> = ({ id }) => {
  const navigate = useNavigate();

  const handlePublish = (canPublish: boolean) => {

    async function sendData() {
      try {
        const publishValue: boolean = canPublish;
        const axiosData: AxiosDataPublish = { inserateId: id, canPublish: publishValue };

        await axios.post(URLs.ORIGIN_SERVER + URLs.POST_PUBLISH, axiosData, { withCredentials: true });
        navigate(0);
      } catch (error: any) {
        notifyError("error", error.response.data.message);
      }
    }
    sendData();
  }

  return <>
    <Toaster />
    <ViewDetailGeneral id={id} isUser={ false }/>
    <Grid container xs={12} sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <Grid item xs={6}><Button sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', '&:hover': { backgroundColor: 'secondary.main', color: 'secondary.contrastText' } }} onClick={() => { handlePublish(true); }} endIcon={<Publish />}>Freigeben</Button></Grid>
      <Grid item xs={6}><Button sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' } }} onClick={() => { handlePublish(false) }} endIcon={<CloseIcon />}>Zurückziehen</Button></Grid>
    </Grid>
  </>
}

export default ViewDetailSearchAdmin;
