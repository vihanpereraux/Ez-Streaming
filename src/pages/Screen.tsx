import React from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

// MUI
import { Box, Typography } from "@mui/material";

// props
import { ScreenNavigationProps } from "../interfaces/props";

const Screen: React.FC = () => {
    const location = useLocation();
    // movie props (nav)
    const props: ScreenNavigationProps = location.state?.data || {};

    return (
        <>
            <Box sx={{
                pt: 15, pl: 6, pr: 6,
                display: "flex",
            }}>
                <Box sx={{ width: '60%' }}>
                    <iframe
                        allowFullScreen={true}
                        style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            border: 'none',
                            borderRadius: 12
                        }}
                        src={`https://vidsrc.xyz/embed/movie/${props.id}`}></iframe>
                </Box>
                {/* details */}
                <Box sx={{ width: '40%', pl: 3.5 }}>
                    <Typography
                        sx={{
                            color: 'white',
                            textAlign: 'left',
                            fontSize: 25,
                            fontFamily: 'Rubik',
                            fontWeight: 450,
                            mb: 1
                        }}>{props.title}</Typography>

                    {/* other details */}
                    <span style={{
                        color: 'white',
                        fontSize: 16,
                    }}>
                        {(props.release_date).slice(0, 4)} &nbsp;&nbsp;
                        <FaStar style={{ color: 'orange' }} /> &nbsp;{Math.round(props.vote_average * 10) / 10}</span>

                    <Typography
                        sx={{
                            fontFamily: 'Rubik',
                            fontSize: 16,
                            lineHeight: 1.6,
                            fontWeight: 400,
                            mt: 3,
                            color: 'white'
                        }}>{props.overview}</Typography>
                </Box>
            </Box>
        </>
    )
}

export default Screen;