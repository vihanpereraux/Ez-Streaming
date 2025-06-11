import React from "react";

// MUI
import { Typography, Box } from "@mui/material";
import { FaStar } from "react-icons/fa6";

// props
interface MovieDetailsProps {
    props: {
        original_title: string,
        release_date: string,
        vote_average: number,
        overview: string,
        genres: any[],
        runtime: number
    };
}

const formatRuntime = (runtime: number) => {
    if (!runtime || runtime <= 0) return null;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
};

const MovieDetails: React.FC<MovieDetailsProps> = ({ props }) => {
    return (
        <>
            <Box sx={{
                bgcolor: { xs: 'rgb(18, 18, 18)', md: 'rgb(16, 15, 15)', lg: 'rgb(10, 10, 10)' },
                p: 2,
                borderRadius: 3,
            }}>
                {/* title */}
                <Typography sx={{
                    color: 'white',
                    textAlign: 'left',
                    fontSize: { xs: 17, lg: 17.5 },
                    fontFamily: 'Rubik',
                    fontWeight: 420,
                    mb: .05,
                }}>{props.original_title}</Typography>

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
                    {props.release_date ? props.release_date.slice(0, 4) : '...'} &nbsp;⋅

                    {/* ratings */}
                    &nbsp; <FaStar style={{ color: '#a2ff00' }} /> &nbsp; {Math.round(props.vote_average * 10) / 10} &nbsp;⋅

                    {/* genre */}
                    &nbsp;&nbsp;{props.genres.map((genre, index) => (
                        <span key={index} style={{ color: 'white', fontFamily: 'Rubik', fontSize: 11, marginRight: 6 }}>{genre.name}</span>
                    ))}

                    {/* run time */}
                    &nbsp;<span style={{ color: 'white', fontFamily: 'Rubik', fontSize: 11 }}>
                        ⋅&nbsp; {props.runtime ? formatRuntime(props.runtime) : 'Duration not available'}
                    </span>
                </span>

                {/* overview */}
                <Typography sx={{
                    fontFamily: 'Rubik',
                    fontSize: { xs: 13, lg: 13 },
                    lineHeight: 1.75,
                    fontWeight: 380,
                    mt: 1.55,
                    color: 'white',
                    opacity: 0.9,
                }}>{props.overview}</Typography>
            </Box>
        </>
    )
}

export default MovieDetails