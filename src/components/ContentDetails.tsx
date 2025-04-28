import React from "react";

// MUI
import { Typography } from "@mui/material";
import { FaStar } from "react-icons/fa6";

// props
interface ContentDetailsProps {
    props: {
        original_title: string;
        release_date: string;
        vote_average: number;
        overview: string;
    };
}

const ContentDetails: React.FC<ContentDetailsProps> = ({ props }) => {
    return (
        <>
            <Typography
                sx={{
                    color: 'white',
                    textAlign: 'left',
                    fontSize: 25,
                    fontFamily: 'Rubik',
                    fontWeight: 450,
                    mb: .8
                }}>{props.original_title}</Typography>

            {/* other details */}
            <span style={{
                color: 'white',
                fontSize: 14
            }}>
                {/* release date */}
                {props.release_date ? props.release_date.slice(0, 4) : '...'} &nbsp;&nbsp;
                {/* ratings */}
                &nbsp; <FaStar style={{ color: '#a2ff00' }} /> &nbsp;{Math.round(props.vote_average * 10) / 10}</span>

            {/* overview */}
            <Typography
                sx={{
                    fontFamily: 'Rubik',
                    fontSize: 16,
                    lineHeight: 1.6,
                    fontWeight: 400,
                    mt: 3,
                    color: 'white',
                    opacity: 0.85,
                }}>{props.overview}</Typography>
        </>
    )
}

export default ContentDetails