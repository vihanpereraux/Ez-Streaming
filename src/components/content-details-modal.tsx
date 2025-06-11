import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// services 
import { getVideos } from "../services/screens/vidoes";

interface Props {
    open: boolean,
    setOPen: (open: boolean) => void
    poster_path: string,
    title: string,
    release_date: string,
    vote_average: number,
    type: string,
    overview: string,
    id: number,
    first_air_date: string
    original_name: string
}

const ContentDetailsModal: React.FC<Props> = ({ open, setOPen, title, original_name, id, overview, release_date, first_air_date, vote_average, type }) => {
    const navigate = useNavigate();
    const [videoKeys, setVideoKeys] = React.useState<string[]>([])

    const getClips = async (type: string) => {
        const response = await getVideos(id.toString(), type);
        if (response.status == 200) {
            const snapshot: string[] = [];
            (response.data as any[]).map((result) => { result.site == 'YouTube' && snapshot.push(result.key) });
            setVideoKeys([...snapshot]);
        } else {
            console.error(`Error occured - ${response.data}`);
        }
    }

    useEffect(() => {
        getClips(type);
    }, [id])

    return (
        <>
            <div>
                <Modal open={open}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '95%', lg: '35%' },
                        backgroundColor: 'rgba(10, 10, 10, 0.65)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxShadow: 'none',
                        pt: { xs: 4, lg: 3 },
                        pl: 3, pr: 3,
                        pb: { xs: 4, lg: 2 },
                        borderRadius: 2.55,
                        overflow: 'auto'
                    }} >
                        {/* YT trailer */}
                        <iframe
                            loading="lazy"
                            style={{
                                border: 'none',
                                outline: 'none',
                                width: '100%',
                                aspectRatio: 16 / 10,
                                objectFit: 'cover',
                                borderRadius: '10px',
                            }}
                            key={id}
                            width={window.innerWidth < 600 ? '100%' : '98%'}
                            src={`https://www.youtube.com/embed/${videoKeys[0]}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=0&disablekb=1&fs=0&iv_load_policy=3&playsinline=1&loop=1&playlist=${videoKeys[0]}`}
                            title={`Clips from ${title}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen={false}
                        />

                        {/* close button */}
                        <Button sx={{
                            boxShadow: 'none',
                            position: 'absolute',
                            top: '3%',
                            right: '3%',
                            background: '#a2ff00',
                            color: 'black',
                            fontFamily: 'Rubik',
                            borderRadius: 1.25,
                            fontWeight: 500,
                            fontSize: 11,
                            p: .85
                        }} variant="contained"
                            onClick={() => { setOPen(false) }}>Close</Button>

                        {/* content details */}
                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{
                                color: 'white',
                                textAlign: 'left',
                                fontSize: { xs: 17, lg: 17 },
                                fontFamily: 'Rubik',
                                fontWeight: 420,
                            }}>{type == "movies" ? title : original_name}</Typography>

                            {/* other details */}
                            <span style={{
                                color: 'white',
                                fontSize: window.innerWidth > 600 ? 11 : 11,
                                display: "inline-flex",
                                alignItems: "center",
                                fontFamily: 'Rubik',
                                opacity: .75
                            }}>
                                {/* release date */}
                                {type == 'movie' ?
                                    release_date ?
                                        release_date.slice(0, 4) : '...' :
                                    first_air_date ?
                                        first_air_date.slice(0, 4) : '...'} &nbsp;⋅

                                {/* ratings */}
                                &nbsp;&nbsp;<FaStar style={{ color: '#a2ff00' }} /> &nbsp; {Math.round(vote_average * 10) / 10}
                            </span>

                            {/* overview */}
                            <Typography sx={{
                                fontFamily: 'Rubik',
                                fontSize: { xs: 13, lg: 13 },
                                lineHeight: 1.75,
                                fontWeight: 380,
                                mt: 2,
                                color: 'white',
                                opacity: 0.9,
                            }}>{overview}</Typography>

                            {/* watch now */}
                            <Button variant="contained"
                                sx={{
                                    width: '100%',
                                    height: 45,
                                    mt: 3.55,
                                    mb: 1,
                                    background: '#a2ff00',
                                    color: 'black',
                                    fontFamily: 'Rubik',
                                    borderRadius: 2,
                                    fontWeight: 500,
                                    fontSize: 12.5
                                }} onClick={() => {
                                    if (type === 'movie') {
                                        navigate(`/screen/movie?id=${id}`);
                                    }
                                    else {
                                        navigate(`/screen/tv?id=${id}`);
                                    }
                                }} >Watch Now</Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default ContentDetailsModal