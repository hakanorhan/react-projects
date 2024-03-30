import React, { MouseEventHandler, useEffect, useState } from 'react'
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import { ParagraphSideMenu, SpanSideMenu, primaryColorMain } from '../../../../themes/ThemeColor';
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

const headlineStyle = { paddingLeft: '20px', fontSize: { xs: '0.8rem', lg:'1rem' }, color: 'whitesmoke', backgroundColor: 'transparent', ':hover': { color: 'orange' }, justifyContent: 'flex-start' };

const oneProcessBoxStyle = { display: 'flex', flexDirection: 'column', fontSize: '0.8rem', color: 'whitesmoke', backgroundColor: 'transparent', ':hover': { color: 'orange' } };
const accordionStyle = { backgroundColor: primaryColorMain, fontSize: '1rem', color: 'whitesmoke', ':hover': { color: 'orange' }, justifyContent: 'flex-start' }

const enum ButtonNames {
  VIEW_CARS = "viewCars",
  ADD_CAR = "addCar",
  ADD_BRAND = "addBrand",
  ADD_MODEL = 'addModel',
  PUBLISH = 'publish'
}

export default function WriteCarData() {

  const [whichButtonClicked, setWhichButtonClicked] = React.useState<string>("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButton = (buttonName: ButtonNames): MouseEventHandler<HTMLButtonElement> => { 
    return event => setWhichButtonClicked(buttonName) 
  };  

 useEffect(() => {
  setIsButtonClicked(false)
 }, [whichButtonClicked])

  const AccordionHinzufuegen = () => {
    return <Accordion sx={accordionStyle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'whitesmoke' }} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <AddIcon sx={{ fontSize: '1.2rem' }} /> <ParagraphSideMenu>Hinzufügen</ParagraphSideMenu>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={oneProcessBoxStyle}>
          <Button sx={headlineStyle} onClick={handleButton(ButtonNames.ADD_BRAND)} > Marke </Button>
          <Button sx={headlineStyle} onClick={handleButton(ButtonNames.ADD_MODEL)}> Modell </Button>
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
        <UpdateIcon sx={{ fontSize: '1.2rem' }} /> <ParagraphSideMenu>Aktualisieren</ParagraphSideMenu>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={oneProcessBoxStyle}>
          <Button sx={headlineStyle} > Auto </Button>
          <Button sx={headlineStyle} > Marke </Button>
          <Button sx={headlineStyle} > Modell </Button>
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
        <DeleteIcon sx={{ fontSize: '1.2rem' }} /> <ParagraphSideMenu>Entfernen</ParagraphSideMenu>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={oneProcessBoxStyle}>
          <Button sx={headlineStyle} > Auto </Button>
          <Button sx={headlineStyle} > Marke </Button>
          <Button sx={headlineStyle} > Modell </Button>
          </Box>
      </AccordionDetails>
    </Accordion>
  }

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
    <>
      
      <Box  sx={{ display: 'flex', flexDirection: 'row', maxWidth: 'xl', margin: {lg: 'auto'} }}>
        {/* <lg */}
        { !isButtonClicked &&
        <Box sx={{ width: { xs:'75px' }, backgroundColor: primaryColorMain }}>
          <Button onClick={ () => { 
            setIsButtonClicked(true)
             } } sx={{ height:'100%', backgroundColor:primaryColorMain }} fullWidth variant="outlined"> <KeyboardArrowRightIcon sx={{ color:'white' }} /></Button>
        </Box>
}
        { isButtonClicked &&
        <Box sx={{ width: {xs: '250px', lg:'300px'}, backgroundColor: primaryColorMain, position: 'fixed', zIndex: 1000 }}>
          <AccordionHinzufuegen />
          <AccordionUpdate />
          <AccordionEntfernen />
          <Button onClick={handleButton(ButtonNames.PUBLISH)} sx={{ marginTop:'0.8rem' }} fullWidth variant="outlined" startIcon={<PublishedWithChangesIcon />}> <p>Veröffentlichen </p></Button>
          <Button sx={{ marginTop:'0.8rem' }} fullWidth variant="outlined" startIcon={<UnpublishedIcon />}> <p>AUFHEBEN </p></Button>
        </Box>
}
        <Box  onClick={() => { setIsButtonClicked(false) }} sx={{ width: '100%', backgroundColor: 'whitesmoke' }}>
          <ShowUI />
        </Box>
      </Box>
    </>
  );
}
