import React, { MouseEventHandler, useRef } from 'react'
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import ViewListIcon from '@mui/icons-material/ViewList';
import { primaryColorMain } from '../../../../themes/ThemeColor';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertBrand from './components/InsertBrand';
import { InsertOneProps } from '../../../../interfaces/componentProps/IPropsInsert';
import InsertBaureihe from './components/InsertBaureihe';
import { URLs } from '../../../../../../autos-backend/src/enums/URLs';
import InsertModel from './components/InsertModel';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublishInserate from './components/PublishInserate';

const headlineStyle = { paddingLeft: '20px', fontSize: '1rem', color: 'whitesmoke', backgroundColor: 'transparent', ':hover': { color: 'orange' }, justifyContent: 'flex-start' };

const oneProcessBoxStyle = { display: 'flex', flexDirection: 'column', paddingLeft: '25px', fontSize: '0.8rem', color: 'whitesmoke', backgroundColor: 'transparent', ':hover': { color: 'orange' } };
const accordionStyle = { backgroundColor: primaryColorMain, fontSize: '1rem', color: 'whitesmoke', ':hover': { color: 'orange' }, justifyContent: 'flex-start' }

const enum ButtonNames {
  VIEW_CARS = "viewCars",
  ADD_CAR = "addCar",
  ADD_BAUREIHE = "addBaureihe",
  ADD_BRAND = "addBrand",
  ADD_MODEL = 'addModel',
  PUBLISH = 'publish'
}



export default function WriteCarData() {

  const [whichButtonClicked, setWhichButtonClicked] = React.useState<string>("");

  const handleButton = (buttonName: ButtonNames): MouseEventHandler<HTMLButtonElement> => { return event => setWhichButtonClicked(buttonName) };  

  const AccordionHinzufügen = () => {
    return <Accordion sx={accordionStyle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'whitesmoke' }} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <AddIcon sx={{ fontSize: '1.2rem' }} /> <p>Hinzufügen</p>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={oneProcessBoxStyle}>
          <Button sx={headlineStyle} onClick={handleButton(ButtonNames.ADD_BRAND)} > Marke </Button>
          <Button sx={headlineStyle} onClick={handleButton(ButtonNames.ADD_MODEL)}> Modell </Button>
          <Button sx={headlineStyle} onClick={handleButton(ButtonNames.ADD_BAUREIHE)}>Baureihe</Button>
          </Box>
      </AccordionDetails>
    </Accordion>
  }

  const AccordionUpdate = () => {
    return <Accordion sx={accordionStyle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'whitesmoke' }} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <UpdateIcon sx={{ fontSize: '1.2rem' }} /> <p>Aktualisieren</p>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={oneProcessBoxStyle}>
          <Button sx={headlineStyle} > Auto </Button>
          <Button sx={headlineStyle} > Marke </Button>
          <Button sx={headlineStyle} > Baureihe </Button>
          <Button sx={headlineStyle} > Modell </Button>
          <Button sx={headlineStyle} > Motorisierung </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  }

  const AccordionEntfernen = () => {
    return <Accordion sx={accordionStyle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'whitesmoke' }} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <DeleteIcon sx={{ fontSize: '1.2rem' }} /> <p>Entfernen</p>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={oneProcessBoxStyle}>
          <Button sx={headlineStyle} > Auto </Button>
          <Button sx={headlineStyle} > Marke </Button>
          <Button sx={headlineStyle} > Baureihe </Button>
          <Button sx={headlineStyle} > Modell </Button>
          <Button sx={headlineStyle} > Motorisierung </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  }

  const ShowUI = () => {

    switch (whichButtonClicked) {
      case ButtonNames.ADD_BRAND: {
        return <InsertBrand /> 
      }

      case ButtonNames.ADD_BAUREIHE: {
        return <InsertBaureihe />
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
    <>
      
      <Box sx={{ display: 'flex', flexDirection: 'row', maxWidth: 'xl', margin: 'auto' }}>
        <Box sx={{ width: '300px', height: '100vh', backgroundColor: primaryColorMain }}>

          <Button sx={headlineStyle} startIcon={<ViewListIcon />}> View Autos </Button>
          <AccordionHinzufügen />
          <AccordionUpdate />
          <AccordionEntfernen />
          <Button onClick={handleButton(ButtonNames.PUBLISH)} sx={{ marginTop:'0.8rem' }} fullWidth variant="outlined" startIcon={<PublishedWithChangesIcon />}> Veröffentlichen </Button>
          <Button sx={{ marginTop:'0.8rem' }} fullWidth variant="outlined" startIcon={<UnpublishedIcon />}> AUFHEBEN </Button>

        </Box>
        <Box sx={{ width: '100%', height: '100vh', backgroundColor: 'whitesmoke' }}>
          <ShowUI />
        </Box>
      </Box>
    </>
  );
}
