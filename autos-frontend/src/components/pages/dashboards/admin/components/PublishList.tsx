import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import ViewListIcon from '@mui/icons-material/ViewList';
import React, { useEffect, useState } from "react";
import { seperateThousand } from "../../../../../helper/helper";
import ViewDetailSearchAdmin from "../../ViewDetailSearchAdmin";
import dayjs from "dayjs";
import { COMPONENT_DISTANCE } from "../../../../../themes/Theme";

interface PublishListProps {
    listItems: any[] | null
}

export const PublishList:React.FC<PublishListProps> = ({ listItems }) => {
    const [viewCarComponent, setViewCarComponent] = useState(false)
    const [inserateId, setInserateId] = useState<number | null>(null);
    
    useEffect(() => {
        if(inserateId !== null){
        setViewCarComponent(true);}
    }, [inserateId])

    const ViewListComponent = () => {
        return <List sx={{  maxHeight:'250px', overflow:'scroll' }}>
            {/* Platzhalter */}
        { 
                (listItems && listItems.length > 0) ?
                listItems.map((item, index) => (
                    <ListItem onClick={() => { setInserateId(item.inserate_id) }} divider key={index} sx={{ '&:hover': { cursor: 'pointer'}  }}>
                        <ListItemIcon> <ViewListIcon /> </ListItemIcon>
                        <ListItemText  key={index} 
                            primary={"Inserat ID: " + item.inserate_id + "  " + item.brand  + " " + item.model + " Preis: " + seperateThousand(item.price) + "€"} 
                            secondary={"Datum Uhrzeit: " + dayjs(item.inserate_date).format('DD.MM.YYYY HH:mm') } >
                        </ListItemText>
                    </ListItem>        
                )) : <Box sx={{ marginLeft: COMPONENT_DISTANCE }}><Typography>Keine neue Inserate.</Typography></Box>

            }
        </List>
    }

  return (
    <Box sx={{ width: '100%' }}>
        <ViewListComponent />
        {
            viewCarComponent ? <ViewDetailSearchAdmin multiple={ true } id={ inserateId } /> : <></>
        }
    </Box>
  )
}
