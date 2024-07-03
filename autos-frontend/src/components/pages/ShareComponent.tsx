import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { COMPONENT_DISTANCE } from '../../themes/Theme';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import { FC, SyntheticEvent, useState } from 'react';

interface ShareComponentProps {
    showText?: boolean
}

const ShareComponent: FC<ShareComponentProps> = ({ showText: showNoText }) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: SyntheticEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseShare = () => {
        setAnchorEl(null);
    };

    return <div>

        <Box display={'flex'} onClick={handleMenu} sx={{ cursor: 'pointer', p: 0, color: 'text.primary', backgroundColor: 'transparent', "&.MuiButtonBase-root:hover": { backgroundColor: "transparent" } }}>
            <ShareIcon sx={{  fontSize:'1.5rem', marginRight: !showNoText ? COMPONENT_DISTANCE : 0, color: 'text.primary' }} />
            <Typography  sx={{  display: showNoText ? 'none' : 'block' }} variant='body1' component='h4'>{"Teilen"}</Typography>
        </Box>

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
                <MenuItem onClick={() => {  }}>
                    <Box display={'flex'}>
                        <EmailIcon sx={{ color: 'text.primary', marginRight: '20px' }} />
                        <Typography sx={{ color: 'text.primary' }}>{"E-Mail"}</Typography>
                    </Box>
                </MenuItem>
                <MenuItem onClick={() => { }}>
                    <Box display={'flex'}>
                        <LinkIcon sx={{ color: 'text.primary', marginRight: '20px' }} />
                        <Typography sx={{ color: 'text.primary' }}>{"Link kopieren"}</Typography>
                    </Box>
                </MenuItem>
                <MenuItem onClick={() => {  }}>
                    <Box display={'flex'}>
                        {/* https://www.designpieces.com/palette/whatsapp-color-palette-hex-and-rgb/ */}
                        <WhatsAppIcon sx={{ color: '#25d366', marginRight: '20px' }} />
                        <Typography sx={{ color: 'text.primary' }}>{"WhatsApp"}</Typography>
                    </Box>
                </MenuItem>
                <MenuItem onClick={() => {  }}>
                    <Box display={'flex'}>
                        <FacebookIcon sx={{ color: '#3b5998', marginRight: '20px' }} />
                        <Typography sx={{ color: 'text.primary' }}>{"Facebook"}</Typography>
                    </Box>
                </MenuItem>
            </MenuList>
        </Menu>
    </div>
}

export default ShareComponent;
