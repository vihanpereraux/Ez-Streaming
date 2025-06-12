import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import Grid from '@mui/material/Grid';

const FooterDisclaimer: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{
                height: 'auto',
                mt: { xs: 8, md: 8, lg: 10 },
                borderRadius: 3,
                pl: 4.55, pr: 4.55,
                pt: 6, pb: 4,
                ml: { xs: 1, md: 1, lg: 2 }, mr: { xs: 1, md: 1, lg: 2 },
                backgroundColor: 'rgba(12, 12, 12, 1)',
                border: '1.25px solid rgba(30, 30, 30, .75)'
            }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid lg={4}>
                            <img style={{
                                width: 130
                            }} src="/logo.png" alt="" />

                            <Typography sx={{
                                color: 'white',
                                textAlign: 'left',
                                fontFamily: 'Rubik',
                                fontWeight: 400,
                                fontSize: 10,
                                mt: .55,
                                opacity: .75,
                                lineHeight: 1.65
                            }}>Seamless Movie & TV Show streaming  in the browser.</Typography>
                        </Grid>

                        <Grid lg={4}>
                            <Typography sx={{
                                color: 'white',
                                textAlign: 'left',
                                fontFamily: 'Rubik',
                                fontWeight: 400,
                                fontSize: 13.55,
                                mt: { xs: 3, md: 0, lg: 0 },
                                opacity: .95,
                            }}>Quick Links</Typography>

                            <Box sx={{ mt: { xs: 1, md: 2.5, lg: 1.5 } }}>
                                <Grid container spacing={0.5}>
                                    {[{ name: "Gallery", path: '/' },
                                    { name: "Watch List", path: '/watch-list' },
                                    { name: "Movies", path: '/movies' },
                                    { name: "Previously Watched", path: '/watch-history' },
                                    { name: "TV Shows", path: '/tv-shows' },
                                    { name: "Search", path: '/search' },
                                    { name: "Games", path: '/games' }].map((item, index) => (
                                        <Grid item xs={6} md={5} key={index}>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    textAlign: 'left',
                                                    fontFamily: 'Rubik',
                                                    fontWeight: 400,
                                                    fontSize: 11,
                                                    mt: .55,
                                                    opacity: .65,
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => { navigate(item.path) }}>
                                                {item.name}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Grid>

                        <Grid lg={4}>
                            <Typography sx={{
                                color: 'white',
                                textAlign: 'left',
                                fontFamily: 'Rubik',
                                fontWeight: 380,
                                fontSize: 10,
                                mt: { xs: 4, md: 0, lg: 0 },
                                opacity: .6
                            }}>
                                Ez Streaming @ {new Date().getFullYear()} <br style={{ marginBottom: 5 }} />
                                All media content available through this application is sourced from publicly available internet streams. We do not own, host, or distribute any of the content. All content remains the property of their respective owners
                            </Typography>

                            <Typography sx={{
                                color: 'white',
                                textAlign: 'left',
                                fontFamily: 'Rubik',
                                fontWeight: 400,
                                fontSize: 11,
                                mt: 2,
                                opacity: .8,
                                cursor: 'pointer'
                            }}
                                onClick={() => { navigate('/disclaimer') }}>
                                Disclaimer&nbsp; ➤
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default FooterDisclaimer