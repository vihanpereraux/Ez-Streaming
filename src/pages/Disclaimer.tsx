import React from "react";

import Navbar from "../components/Navbar";

// MUI
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

const Disclaimer: React.FC = () => {
    return (
        <>
            <Navbar />

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                backgroundColor: 'none',
                padding: { xs: '10px', lg: '20px' },
            }}>
                <Typography sx={{
                    fontSize: { xs: '14px', lg: '16px' },
                    fontFamily: 'Rubik',
                    color: 'white',
                    width: { xs: '95%', md: '85%' },
                    textAlign: 'center',
                    lineHeight: '1.65',
                }}>
                    This website provides links to third-party content that is freely available on the internet.
                    We do not host any of the content displayed on this platform, nor do we claim ownership of it.
                    All trademarks, copyrights, and other intellectual property rights belong to their respective owners.
                    The content linked through this platform is not endorsed or verified by us.
                    We do not guarantee the availability, accuracy, or legality of the content on external sites.
                </Typography>
            </Box>
        </>
    )
}

export default Disclaimer