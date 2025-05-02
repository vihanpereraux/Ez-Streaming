import React, { useState } from "react";

// MUI
import { Box } from "@mui/material";

// components
import Navbar from "../components/Navbar";
import LoadingPreview from "../components/LoadingPreview";

const LiveTV: React.FC = () => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <Navbar />
            {loading && <LoadingPreview />}
            <iframe
                style={{
                    width: '100%',
                    height: '91.5vh',
                    outline: 'none',
                    border: 'none',
                    boxShadow: 'none',
                    background: 'black',
                    display: loading ? 'none' : 'block'
                }}
                src="https://homeless-tv.vercel.app/"
                allowFullScreen
                onLoad={() => setLoading(false)}
            ></iframe>
            <Box sx={{ mb: { xs: 15, lg: 10 } }}></Box>
        </>
    )
}

export default LiveTV