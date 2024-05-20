import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import ViewListIcon from '@mui/icons-material/ViewList';
import { mainComponentHeight } from "../../../../../themes/Theme";
import React, { useEffect, useState } from "react";
import { seperateThousand } from "../../../../../helper/helper";
import ViewDetailSearch from "../../../ViewDetailSearchAdmin";
import dayjs from "dayjs";

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
        return <List sx={{ height: viewCarComponent ? '' : mainComponentHeight }}>
            {/* Platzhalter */}
        { 
                (listItems && listItems.length > 0) ?
                listItems.map((item, index) => (
                    <ListItem onClick={() => { setInserateId(item.inserate_id) }} divider key={index} sx={{ '&:hover': { cursor: 'pointer'}  }}>
                        <ListItemIcon> <ViewListIcon /> </ListItemIcon>
                        <ListItemText  key={index} 
                            primary={"Inserat ID: " + item.inserate_id + "  " + item.brand  + " " + item.model + " Preis: " + seperateThousand(item.price) + "€"} 
                            secondary={"Datum Uhrzeit: " + dayjs(item.inserate_date).format('DD.MM.YYYY HH:MM') } >
                        </ListItemText>
                    </ListItem>        
                )) : <Box sx={{ marginLeft:'1rem' }}>Keine neue Inserate.</Box>

            }
        </List>
    }

  return (
    <Box sx={{ width: '100%' }}>
        <ViewListComponent />
        {
            viewCarComponent ? <ViewDetailSearch id={inserateId} /> : <></>
        }
    </Box>
  )
}
