import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// MUI
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// services
import { getOnlineGames } from "../services/games";

// props
interface GameProps {
    embed: string,
    image: string
}

const Games: React.FC = () => {
    const [games, setGames] = useState<GameProps[]>([]);
    const [open, setOpen] = React.useState(false);
    const [embedLink, setEmbedLink] = useState<string>("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getGames = async () => {
        const response = await getOnlineGames();
        if (response.status == 200) {
            setGames([...response.data])
        }
        else {
            console.error(`Error - ${response.data}`)
        }
    }

    const handleUserSelection = (link: string) => {
        setEmbedLink(link);
    }

    useEffect(() => {
        getGames();
    }, [])

    return (
        <>
            <Navbar />

            <Box sx={{ p: 3 }}>
                {/* title */}
                <Typography
                    sx={{
                        color: "white",
                        fontFamily: "Rubik",
                        textAlign: "center",
                        fontWeight: 450,
                        fontSize: 22
                    }}>
                    Enjoy Free Online Games
                </Typography>

                {/* description */}
                <Typography
                    sx={{
                        color: "white",
                        fontFamily: "Rubik",
                        mt: 2,
                        textAlign: "center",
                        fontWeight: 400,
                        fontSize: 14,
                        opacity: .75,
                        pl: { sx: 5, lg: 30 },
                        pr: { sx: 5, lg: 30 },
                        lineHeight: 1.65
                    }}>
                    Dive into a curated collection of free online games! Click on any game below to
                    start playing instantly in your browser—no downloads or sign-ups required.
                    Enjoy a variety of genres and discover new favorites every day.
                </Typography>

                {/* grid */}
                <Grid container spacing={2} justifyContent="center" sx={{ mt: 5 }}>
                    {[...games]
                        .sort(() => Math.random() - 0.5)
                        .map((game, index) => (
                            <Grid item xs={4} sm={3} md={2} key={index}>
                                <Box sx={{
                                    width: "100%",
                                    aspectRatio: "1",
                                    borderRadius: 2,
                                    boxShadow: 2,
                                }} onClick={() => { handleUserSelection(game.embed) }}>
                                    <img
                                        className="game"
                                        style={{
                                            aspectRatio: 1,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: 12,
                                            border: ' 2px solid black'
                                        }} onClick={handleOpen} src={game.image} alt="" loading="lazy" />
                                </Box>
                            </Grid>
                        ))}
                </Grid>
            </Box>

            {/* game player */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    bgcolor: 'black',
                    outline: 'none',
                    border: 'none',
                    boxShadow: 'none',
                    p: 0,
                }}>
                    {/* close button */}
                    <Button sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        color: '#a2ff00',
                        fontFamily: 'Rubik',
                        fontWeight: 450
                    }} onClick={handleClose}>Close</Button>

                    <iframe
                        style={{
                            width: '100%',
                            height: '100%',
                            outline: 'none',
                            border: 'none',
                            boxShadow: 'none',
                            background: 'black',
                            display: 'block'
                        }}
                        src={embedLink}
                        allowFullScreen
                    ></iframe>
                </Box>
            </Modal>
        </>
    );
};

export default Games;