import React from "react";

// MUI
import { Typography } from "@mui/material";
import { FaStar } from "react-icons/fa6";

// props
interface ContentDetailsProps {
    props: {
        original_title: string,
        release_date: string,
        vote_average: number,
        overview: string,
        genres: any[],
        runtime: number
    };
}

// Helper to convert runtime in minutes to "Xh Ym" format
const formatRuntime = (runtime: number) => {
    if (!runtime || runtime <= 0) return null;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
};

const ContentDetails: React.FC<ContentDetailsProps> = ({ props }) => {
    return (
        <>
            <Typography
                sx={{
                    color: 'white',
                    textAlign: 'left',
                    fontSize: { xs: 20, lg: 22 },
                    fontFamily: 'Rubik',
                    fontWeight: 400,
                    mb: .8
                }}>{props.original_title}</Typography>

            {/* other details */}
            <span style={{
                color: 'white',
                fontSize: 14
            }}>
                {/* release date */}
                {props.release_date ? props.release_date.slice(0, 4) : '...'} &nbsp;⋅

                {/* ratings */}
                &nbsp; <FaStar style={{ color: '#a2ff00' }} /> &nbsp;{Math.round(props.vote_average * 10) / 10} &nbsp;⋅
            </span>

            {/* genre */}
            &nbsp;&nbsp;{props.genres.map((genre, index) => (
                <span key={index} style={{ color: 'white', fontFamily: 'Rubik', fontSize: 14, marginRight: 6 }}>{genre.name}</span>
            ))}

            &nbsp;<span style={{ color: 'white', fontFamily: 'Rubik', fontSize: 14 }}>
            ⋅&nbsp; {formatRuntime(props.runtime)}
            </span>

            {/* overview */}
            <Typography
                sx={{
                    fontFamily: 'Rubik',
                    fontSize: { xs: 15, lg: 15 },
                    lineHeight: 1.65,
                    fontWeight: 400,
                    mt: 3,
                    color: 'white',
                    opacity: 0.85,
                }}>{props.overview}</Typography>
        </>
    )
}

export default ContentDetails