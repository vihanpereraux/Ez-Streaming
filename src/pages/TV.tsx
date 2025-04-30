import React from "react";

// MUI
import { Box } from "@mui/material";

// components
import Navbar from "../components/Navbar";

const LiveTV: React.FC = () => {
    return (
        <>
            <Navbar />
            <iframe
                style={{
                    width: '100%',
                    height: '91.5vh',
                    outline: 'none',
                    border: 'none',
                    boxShadow: 'none',
                    background: 'black',
                    display: 'block'
                }}
                src="https://homeless-tv.vercel.app/" allowFullScreen></iframe>
            <Box sx={{ mb: { xs: 15, lg: 10 } }}></Box>
        </>
    )
}

export default LiveTV