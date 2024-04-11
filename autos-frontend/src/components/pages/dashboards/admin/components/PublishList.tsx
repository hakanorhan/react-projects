import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import ViewListIcon from '@mui/icons-material/ViewList';
import { secondaryColorLight } from "../../../../../themes/ThemeColor";
import React, { useEffect, useState } from "react";
import { seperateThousand } from "../../../../../helper/helper";
import ViewDetailSearch from "../../../ViewDetailSearch";

interface PublishListProps {
    listItems: any[] | null
}

export const PublishList:React.FC<PublishListProps> = ({ listItems }) => {

    const [viewCarComponent, setViewCarComponent] = useState(false)
    const [carId, setCarId] = useState<number | null>(null);
    

    
    useEffect(() => {
        if(carId !== null)
        setViewCarComponent(true);
    }, [carId])

    const ViewListComponent = () => {
        return <List>
        { 
                (listItems && listItems.length > 0) ?
                listItems.map((item, index) => (
                    <ListItem onClick={() => { setCarId(item.carid) }} divider key={index} sx={{ '&:hover': {backgroundColor: secondaryColorLight, cursor: 'pointer'}  }}>
                        <ListItemIcon> <ViewListIcon /> </ListItemIcon>
                        <ListItemText  key={index} 
                            primary={"Inserat ID: " + item.carid + "  " + item.brand  + " " + item.model + " Preis: " + seperateThousand(item.price) + "€"} 
                            secondary={"Datum: " + item.advertiseddate } >
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
            viewCarComponent ? <ViewDetailSearch id={carId} /> : <></>
        }
    </Box>
  )
}
