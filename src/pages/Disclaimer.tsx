import React from "react";

// MUI
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

const Disclaimer: React.FC = () => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'none',
                padding: '20px',
            }}>
                <Typography sx={{
                    fontSize: '16px',
                    fontFamily: 'Rubik',
                    color: 'white',
                    width: { xs: '70%', md: '85%'},
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