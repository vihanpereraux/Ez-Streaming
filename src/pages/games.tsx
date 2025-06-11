import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import playIcon from "../../public/icons/play-icon.json";

// components
import Navbar from "../components/navbar";
import LoadingPreview from "../components/loading-preview";

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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [games, setGames] = useState<GameProps[]>([]);
    const [open, setOpen] = React.useState(false);
    const [embedLink, setEmbedLink] = useState<string>("");
    const handleClose = () => setOpen(false);

    const getGames = async () => {
        const response = await getOnlineGames();
        if (response.status == 200) {
            setGames([...response.data])
        }
        else {
            console.error(`Error - ${response.data}`)
        }
        setIsLoading(false);
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

            {isLoading ? (
                <LoadingPreview />
            ) : (
                <>
                    <Box sx={{ mt: 6, pl: 5, pr: 5 }}>
                        {/* title */}
                        <Typography
                            sx={{
                                color: "white",
                                fontFamily: "Rubik",
                                textAlign: "center",
                                fontWeight: 420,
                                fontSize: 18
                            }}>
                            Enjoy Free Online Games
                        </Typography>

                        {/* description */}
                        <Typography
                            sx={{
                                color: "white",
                                fontFamily: "Rubik",
                                mt: 1.75,
                                textAlign: "center",
                                fontWeight: 400,
                                fontSize: 11,
                                opacity: .75,
                                pl: { sx: 0, lg: 30 },
                                pr: { sx: 0, lg: 30 },
                                lineHeight: 1.65
                            }}>
                            Dive into a curated collection of free online games! Click on any game below to
                            start playing instantly in your browser. Enjoy a variety of genres and discover new favorites every day..
                        </Typography>
                    </Box>

                    {/* grid */}
                    <Box sx={{ pl: { xs: 0, lg: 7 }, pr: { xs: 0, lg: 7 }, mt: 5 }}>
                        <Grid container spacing={.35} justifyContent="center">
                            {[...games]
                                .sort(() => Math.random() - 0.5)
                                .map((game, index) => (
                                    <Grid item xs={6} sm={3} md={2} key={index}>
                                        <div style={{ position: 'relative' }}
                                            className="game-wrapper"
                                            onClick={() => {
                                                handleUserSelection(game.embed)
                                                setOpen(true);
                                            }}>
                                            <Box sx={{
                                                width: "100%",
                                                aspectRatio: "1",
                                                borderRadius: 2,
                                                boxShadow: 2,
                                            }}>
                                                <img
                                                    className="game"
                                                    style={{
                                                        aspectRatio: 1,
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: 12,
                                                        border: ' 2px solid black'
                                                    }} src={game.image} alt="" loading="lazy" />
                                            </Box>

                                            {/* icon */}
                                            {window.innerWidth > 1200 && (
                                                <Lottie className="play-icon"
                                                    style={{
                                                        opacity: 0,
                                                        width: 85,
                                                        position: 'absolute',
                                                        left: '50%',
                                                        top: '55%',
                                                        transform: 'translate(-50%, -50%)',
                                                        zIndex: 3,
                                                        cursor: 'pointer',
                                                    }} animationData={playIcon} loop={true} />
                                            )}

                                            {/* tag */}
                                            <Box sx={{
                                                position: 'absolute',
                                                left: 12,
                                                top: 12,
                                                width: '100%',
                                                zIndex: 2
                                            }}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}>
                                                    <Box sx={{
                                                        height: 20,
                                                        width: 2.35,
                                                        bgcolor: '#a2ff00',
                                                        mr: .75,
                                                        borderRadius: 10,
                                                    }}></Box>
                                                    <Typography
                                                        sx={{
                                                            color: 'white',
                                                            textTransform: 'capitalize',
                                                            fontSize: { xs: 9, lg: 9.5 },
                                                            fontWeight: { xs: 450, lg: 420 },
                                                            fontFamily: 'Rubik',
                                                            lineHeight: 1.25,
                                                            opacity: .9,
                                                            width: 'fit-content',
                                                        }}>Play now <br /> on Ez Streaming
                                                    </Typography>

                                                </Box>

                                            </Box>

                                            {/* shader */}
                                            <Box sx={{
                                                position: 'absolute',
                                                left: 0,
                                                top: 0,
                                                width: '100%',
                                                height: '100%',
                                                background: 'linear-gradient(to bottom, rgba(0,0,0,.8) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0) 60%)',
                                                zIndex: 0,
                                            }}>
                                            </Box>
                                        </div>
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>

                    <Box sx={{ mb: { xs: 12, lg: 12 } }}></Box>
                </>
            )}


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