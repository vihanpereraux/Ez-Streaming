import React from 'react';
import { useNavigate } from 'react-router-dom';

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// props
import { NavItemProps } from '../interfaces/props';

const navButtonStylings = {
    textTransform: 'capitalize',
    fontSize: 15,
    fontFamily: 'Rubik',
    fontWeight: 400,
    mr: 1,
    background: 'none'
}

const navItems: NavItemProps[] = [
    {
        navItem: "Home",
        path: "/"
    },
    // {
    //     navItem: "Movies",
    //     path: "/movies"
    // },
    {
        navItem: "Search",
        path: "/search"
    },
    {
        navItem: "Games",
        path: "/games"
    },
    {
        navItem: "Disclaimer",
        path: "/disclaimer"
    }
]

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const navigateToPages = (path: string) => {
        navigate(path);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{
                background: 'rgba(6, 6, 6, 0.9)',
                height: 80,
                display: 'flex',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
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
                        onClick={() => { navigate('/') }}
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'Rubik',
                            cursor: 'pointer',
                            fontWeight: 450,
                            fontSize: 16
                        }}>
                        Ez Streaming
                    </Typography>

                    {navItems.map((item, index) => (
                        <div key={index}>
                            <Button
                                className={`${item.navItem}-nav-item`}
                                onClick={() => { navigateToPages(item.path) }}
                                sx={navButtonStylings}
                                color="inherit">{item.navItem}</Button>
                        </div>
                    ))}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;