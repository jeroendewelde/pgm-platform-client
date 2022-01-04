import React, { ReactElement, useState } from 'react'

// Material UI
// import Drawer from '@material-ui/core/Drawer'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';

// import { AppBar, Box, Drawer, Toolbar, Typography } from '@material-ui/core';

interface Props {
    
}

export default function NavigationCopy({}: Props): ReactElement {
    const [open, setOpen] = useState(true);

    const toggleNavigation = () => {
        setOpen(!open);
    }

    

    return (
        <>
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        // onClick={toggleNavigation}
                    >
                        <MenuIcon />   
                    </IconButton>
                    <Typography variant="h6" components="div" sx={{ flexGrow: 1}}>
                        PGM-platform
                    </Typography>
                    <Button color="inherit">
                        Login
                    </Button>
                </Toolbar>

            </AppBar>

        </Box>
        </>
    )
}
