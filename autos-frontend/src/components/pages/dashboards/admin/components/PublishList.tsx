import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ViewListIcon from '@mui/icons-material/ViewList';
import { FC, useEffect, useState } from "react";
import { seperateThousand } from "../../../../../helper/helper";
import ViewDetailSearchAdmin from "../../ViewDetailSearchAdmin";
import dayjs from "dayjs";
import { COMPONENT_DISTANCE } from "../../../../../themes/Theme";
import { useDispatch, useSelector } from "react-redux";
import { handleDialog } from "../../../../../redux/features/iOpenPublishSlice";
import { RootState } from "../../../../../redux/store";

interface PublishListProps {
    listItems: any[] | null
}

export const PublishList:FC<PublishListProps> = ({ listItems }) => {
    const [viewCarComponent, setViewCarComponent] = useState(false)
    const [inserateId, setInserateId] = useState<number | null>(null);

    const dispatch = useDispatch();
    let OpenValue = useSelector((state: RootState) => state.openClosePublishReducer.open);

    const handleClose = () => {
        dispatch(handleDialog(false))
    }

    useEffect(() => {
        if(inserateId !== null){
        setViewCarComponent(true);}
    }, [inserateId])

    const ViewListComponent = () => {
        return <List sx={{  maxHeight:'450px', overflow:'scroll' }}>
            {/* Platzhalter */}
        { 
                (listItems && listItems.length > 0) ?
                listItems.map((item, index) => (
                    <ListItem onClick={() => { setInserateId(item.inserate_id); dispatch(handleDialog(true)); }} divider key={index} sx={{ '&:hover': { cursor: 'pointer'}  }}>
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
            viewCarComponent ? <Dialog open={ OpenValue } onClose={ handleClose } sx={{ '& .MuiDialog-paper': {
                width: { xs: '100%', lg: '1050px' },
                maxWidth: 'none',
              },}}><ViewDetailSearchAdmin id={ inserateId } /></Dialog> : <></>
        }
    </Box>
  )
}
