import React, { MouseEventHandler, useEffect, useState } from 'react'
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import { ParagraphSideMenu, SpanSideMenu, minHeightContent, primaryColorMain, secondaryColorLight } from '../../../../themes/ThemeColor';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertBrand from './components/InsertBrand';
import InsertModel from './components/InsertModel';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublishInserate from './components/PublishInserate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setWhichButtonClicked } from '../../../../redux/features/userlogged';

const headlineStyle = { paddingLeft: '20px', fontSize: { xs: '0.8rem', lg:'1rem' }, color: 'whitesmoke', backgroundColor: 'transparent', ':hover': { color: 'orange' }, justifyContent: 'flex-start' };

const oneProcessBoxStyle = { display: 'flex', flexDirection: 'column', fontSize: '0.8rem', color: 'whitesmoke', backgroundColor: 'transparent', ':hover': { color: 'orange' } };
const accordionStyle = { backgroundColor: secondaryColorLight, fontSize: '1rem', color: 'whitesmoke', ':hover': { color: 'orange' }, justifyContent: 'flex-start' }

const enum ButtonNames {
  VIEW_CARS = "viewCars",
  ADD_CAR = "addCar",
  ADD_BRAND = "addBrand",
  ADD_MODEL = 'addModel',
  PUBLISH = 'publish'
}

export default function WriteCarData() {

  // Redux
  const whichButtonClicked = useSelector((state: RootState) => state.userLoggedIn.whichButtonClicked)

  const ShowUI = () => {
    switch (whichButtonClicked) {
      case ButtonNames.ADD_BRAND: {
        return <InsertBrand /> 
      }
      case ButtonNames.ADD_MODEL: { 
        return <InsertModel />
          }
      case ButtonNames.PUBLISH: {
        return <PublishInserate />
      }
    }
  }

  return (
    <>          <ShowUI />
        
    </>
  );
}
