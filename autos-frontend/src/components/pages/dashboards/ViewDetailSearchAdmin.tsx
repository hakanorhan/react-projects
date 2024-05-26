import React from 'react'
import { URLs } from '../../../enums/URLs';
import axios from 'axios';
import { AxiosDataPublish } from '../../../interfaces/IAxiosData';
import { CarImagesProps } from './admin/components/CarImages';
import { Button, Grid } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { Publish } from '@mui/icons-material';
import dayjs from 'dayjs';
import ViewDetailGeneral from '../search/viewDetail/ViewDetailGeneral';
import { useNavigate } from 'react-router-dom';

const ViewDetailSearch: React.FC<CarImagesProps> = ({ id }) => {
  const navigate = useNavigate();
  
  const handlePublish = (canPublish: boolean) => {

    const timeStamp = dayjs();
    console.log(timeStamp + " Timestamp")

    async function sendData() {
      try {
        //const inserateId = detailSearchValues?.inseratId
        const publishValue: boolean = canPublish;
        const axiosData: AxiosDataPublish = { inserateId: id, canPublish: publishValue };

        try {
          const response = await axios.post<AxiosDataPublish>(URLs.ORIGIN_SERVER + URLs.POST_PUBLISH, axiosData, { withCredentials: true });
          // TODO: reolad
          navigate(0);

        } catch (error) {
          console.log("Hier ein error!" + error)
        }

      } catch (error) {

      }
    }
    sendData();
  }

  return <>
    <ViewDetailGeneral id={ id } multiple={true}/>
    <Grid container xs={12} sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Grid item xs={6}><Button  sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', '&:hover': { backgroundColor: 'secondary.main', color: 'secondary.contrastText' } }} onClick={() => { handlePublish(true); }} endIcon={<Publish />}>Freigeben</Button></Grid>
          <Grid item xs={6}><Button  sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' } }} onClick={() => { handlePublish(false) }} endIcon={<CloseIcon />}>Zurückziehen</Button></Grid>
        </Grid>
  </>
}

export default ViewDetailSearch;
