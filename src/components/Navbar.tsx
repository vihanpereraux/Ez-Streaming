import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const navButtonStylings = {
    textTransform: 'capitalize',
    fontSize: 20,
    fontFamily: 'Rubik',
    fontWeight: 450,
    mr: 1
}

const Navbar: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{
                background: 'rgba(8, 0, 35, 0.9)',
                height: 80,
                display: 'flex',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)'
            }} position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {/* <MenuIcon /> */}
                    </IconButton>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'Rubik'
                        }}>
                        Ez Streaming
                    </Typography>

                    <Button
                        sx={navButtonStylings}
                        color="inherit">Movies</Button>

                    <Button
                        sx={navButtonStylings}
                        color="inherit">TV Series</Button>

                    <Button
                        sx={navButtonStylings}
                        color="inherit">Search</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;