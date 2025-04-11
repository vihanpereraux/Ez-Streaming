import React from 'react';
import { useNavigate } from 'react-router-dom';

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

// props
import { NavItemProps } from '../interfaces/props';
const navButtonStylings = {
    textTransform: 'capitalize',
    fontSize: 15,
    fontFamily: 'Rubik',
    fontWeight: 420,
    mr: 1,
    background: 'none'
}
interface Props { window?: () => Window; }

// nav items
const navItems: NavItemProps[] = [
    {
        navItem: "Home",
        path: "/"
    },
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

// mobile drawer width
const drawerWidth = 240;

const Navbar: React.FC = (props: Props) => {
    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    {/* mobile drawer */ }
    const drawer = (
        <Box onClick={handleDrawerToggle}
            sx={{
                textAlign: 'center',
                backgroundColor: 'rgb(10, 10, 10)',
                height: '100%',
                color: 'white'
            }}>
            <Typography variant="h6" sx={{ my: 2, color: 'white' }}>
                <img style={{ width: 125 }} src="/logo.png" alt="Ez-Streaming-Logo" />
            </Typography>

            <Divider />

            <List>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.navItem}
                                onClick={() => { navigateToPages(item.path) }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const navigateToPages = (path: string) => {
        navigate(path);
    }

    return (
        <>
            <CssBaseline />

            {/* base nav */}
            <AppBar component="nav"
                sx={{
                    backgroundColor: 'rgb(10, 10, 10)',
                    position: 'relative'
                }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                        <Box sx={{
                            backgroundColor: 'none',
                            width: '100vw',
                            height: '100%',
                            position: 'absolute',
                            bottom: 0,
                            left: 0
                        }}>
                            <img style={{
                                width: 125,
                                position: 'absolute',
                                transform: 'translate(-50%, -50%)',
                                top: '50%',
                                left: '50%'
                            }} src="/logo.png" alt="Ez-Streaming-Logo" />
                        </Box>
                        <IconButton />
                    </IconButton>
                    {/* base nav -logo */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <img style={{ width: 125, cursor: 'pointer' }}
                            src="/logo.png"
                            alt="Ez-Streaming-Logo"
                            onClick={() => { navigate('/') }} />
                    </Typography>

                    {/* base nav -nav items */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item, index) => (
                            <Button key={index}
                                sx={navButtonStylings}
                                onClick={() => { navigateToPages(item.path) }} color="inherit">
                                {item.navItem}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* mobile drawer */}
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </>
    );
}

export default Navbar;