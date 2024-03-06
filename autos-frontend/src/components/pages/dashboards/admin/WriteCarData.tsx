import React, { MouseEventHandler, useRef } from 'react'
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import ViewListIcon from '@mui/icons-material/ViewList';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { primaryColorMain } from '../../../../themes/ThemeColor';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextFieldName from '../../../formularFields/TextFieldName';
import axios from 'axios';

const headlineStyle = { paddingLeft: '20px', fontSize: '1rem', color: 'whitesmoke', backgroundColor: 'transparent', ':hover': { color: 'orange' }, justifyContent: 'flex-start' };

const oneProcessBoxStyle = { display: 'flex', flexDirection: 'column', paddingLeft: '25px', fontSize: '0.8rem', color: 'whitesmoke', backgroundColor: 'transparent', ':hover': { color: 'orange' } };
const accordionStyle = { backgroundColor: primaryColorMain, fontSize: '1rem', color: 'whitesmoke', ':hover': { color: 'orange' }, justifyContent: 'flex-start' }

const enum ButtonNames {
  VIEW_CARS = "viewCars",
  ADD_CAR = "addCar",
  ADD_BRAND = "addBrand",
  ADD_MODEL = 'addModel'
}

export default function WriteCarData() {

  const [whichButtonClicked, setWhickButtonClicked] = React.useState<string>("");

  const [selectedBrand, setSelectedBrand] = React.useState<string>("");

  const handleButton = (buttonName: ButtonNames): MouseEventHandler<HTMLButtonElement> => { return event => setWhickButtonClicked(buttonName) };

  // Components
  const BrandComponent = () => {
    const brandRef = useRef<HTMLInputElement>(null);

    const handleChangeBrand = (event: SelectChangeEvent) => {
      const brand = event.target.value as string;
      setSelectedBrand(brand);

    };

    const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
      event.preventDefault();
      const brand: string | undefined = brandRef.current?.value;
      // valid brand
      if(brand) {
        await axios.post('http://localhost:3001/write/brand', brand, { withCredentials: true })
          .then((response) => { alert(response.data) })
      }
    }

    return <Box sx={{ padding:'15px' }}>
      <form onSubmit={ handleSubmit } noValidate>
    <Box sx={{ width:'250px' }}>
      <TextFieldName id='markeHinzufuegen' label='Marke hinzufügen' inputRef={brandRef}/>
    </Box>
      <Button type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
    </form>
    </Box>
  };

  const AccordionHinzufügen = () => {
    return       <Accordion sx={ accordionStyle }>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon sx={{color:'whitesmoke'}}/>}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      <AddIcon sx={{ fontSize:'1.2rem' }}/> <p>Hinzufügen</p>
    </AccordionSummary>
    <AccordionDetails>
    <Box sx={oneProcessBoxStyle}>
            <Button sx={headlineStyle} onClick={ handleButton(ButtonNames.ADD_CAR) } > Auto </Button>
            <Button sx={headlineStyle} onClick={ handleButton(ButtonNames.ADD_BRAND) } > Marke </Button>
            <Button sx={headlineStyle} > Baureihe </Button>
            <Button sx={headlineStyle} > Modell </Button>
            <Button sx={headlineStyle} > Motorisierung </Button>
          </Box>
    </AccordionDetails>
  </Accordion>
  }

  const AccordionUpdate = () => {
    return       <Accordion sx={ accordionStyle }>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon sx={{color:'whitesmoke'}}/>}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      <UpdateIcon sx={{ fontSize:'1.2rem' }}/> <p>Aktualisieren</p>
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
    return       <Accordion sx={ accordionStyle }>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon sx={{color:'whitesmoke'}}/>}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      <DeleteIcon sx={{ fontSize:'1.2rem' }}/> <p>Entfernen</p>
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
    switch(whichButtonClicked){
      case ButtonNames.ADD_BRAND: { return <BrandComponent /> }
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

        </Box>
        <Box sx={{ width: '100%', height: '100vh', backgroundColor: 'whitesmoke' }}>
          <ShowUI />
        </Box>
      </Box>
    </>
  );
}
