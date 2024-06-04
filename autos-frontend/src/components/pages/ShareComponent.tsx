import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { COMPONENT_DISTANCE } from '../../themes/Theme';
import { Button, ListItemIcon, Menu, MenuItem, MenuList, Typography } from '@mui/material';

interface ShareComponentProps {
    showText?: boolean
}

const ShareComponent: React.FC<ShareComponentProps> = ({ showText: showNoText }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.SyntheticEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseShare = () => {
        setAnchorEl(null);
    };

    return <div>
        <Button sx={{ p: 0, color: 'text.primary', backgroundColor: 'transparent', "&.MuiButtonBase-root:hover": { backgroundColor: "transparent" } }}
            size="large"
            onClick={handleMenu}
            startIcon={<ShareIcon sx={{ cursor: 'pointer', marginRight: !showNoText ? COMPONENT_DISTANCE : 0, color: 'text.primary' }} />}>
            {"Teilen"}
        </Button>

        <Menu sx={{ mt: '30px' }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseShare}
        >
            <MenuList>
                <MenuItem onClick={() => { handleCloseShare() }}>
                    <ListItemIcon>
                        <EmailIcon sx={{ color: 'primary.main', marginRight: '20px' }} />
                        <Typography sx={{ color: 'text.primary' }}>{"E-Mail"}</Typography>
                    </ListItemIcon>
                </MenuItem>
                <MenuItem onClick={() => { handleCloseShare }}>
                    <ListItemIcon>
                        <LinkIcon sx={{ color: 'primary.main', marginRight: '20px' }} />
                        <Typography sx={{ color: 'text.primary' }}>{"Link kopieren"}</Typography>
                    </ListItemIcon>
                </MenuItem>
                <MenuItem onClick={() => { handleCloseShare() }}>
                    <ListItemIcon>
                        {/* https://www.designpieces.com/palette/whatsapp-color-palette-hex-and-rgb/ */}
                        <WhatsAppIcon sx={{ color: '#25d366', marginRight: '20px' }} />
                        <Typography sx={{ color: 'text.primary' }}>{"WhatsApp"}</Typography>
                    </ListItemIcon>
                </MenuItem>
                <MenuItem onClick={() => { handleCloseShare() }}>
                    <ListItemIcon>
                        <FacebookIcon sx={{ color: '#3b5998', marginRight: '20px' }} />
                        <Typography sx={{ color: 'text.primary' }}>{"Facebook"}</Typography>
                    </ListItemIcon>
                </MenuItem>
            </MenuList>
        </Menu>
    </div>
}

export default ShareComponent;
