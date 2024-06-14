import React from 'react'
import { URLs } from '../../../constants/values';
import axios from 'axios';
import { AxiosDataPublish } from '../../../interfaces/IAxiosData';
import { CarImagesProps } from '../search/CarImages';
import { Button, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Publish } from '@mui/icons-material';
import ViewDetailGeneral from '../search/viewDetail/ViewDetailGeneral';
import { Toaster } from 'react-hot-toast';
import { notifyError, notifySuccess } from '../../../helper/toastHelper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { COMPONENT_DISTANCE } from '../../../themes/Theme';
import { handleDialog } from '../../../redux/features/slices';

const ViewDetailSearchAdmin: React.FC<{id: number | null}> = ({ id }) => {
  const carsNotFound = useSelector((state: RootState) => state.detailSearch.carsNotFound);
  const dispatch = useDispatch();
  const handlePublish = (canPublish: boolean) => {

    async function sendData() {
      try {
        const publishValue: boolean = canPublish;
        const axiosData: AxiosDataPublish = { inserateId: id, canPublish: publishValue };

        await axios.post(URLs.ORIGIN_SERVER + URLs.POST_PUBLISH, axiosData, { withCredentials: true });
        
      } catch (error: any) {
        notifyError(error.response.data.messageId, error.response.data.message);
      } finally {
        dispatch(handleDialog(false));
      }
    }
    sendData();
  }

  return <>
    <Toaster />
    <ViewDetailGeneral id={id} isUser={ false } />
    { carsNotFound === false &&
    <Grid container spacing={2} sx={{ paddingLeft:'1rem', paddingRight:'1rem', marginTop: COMPONENT_DISTANCE, marginBottom: COMPONENT_DISTANCE }}>
      <Grid item xs={6}><Button sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', '&:hover': { backgroundColor: 'secondary.main', color: 'secondary.contrastText' } }} onClick={() => { handlePublish(true);   }} endIcon={<Publish />}>Freigeben</Button></Grid>
      <Grid item xs={6}><Button sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' } }} onClick={() => { handlePublish(false); }} endIcon={<CloseIcon />}>Zurückziehen</Button></Grid>
    </Grid>
  }
  </>
}

export default ViewDetailSearchAdmin;
