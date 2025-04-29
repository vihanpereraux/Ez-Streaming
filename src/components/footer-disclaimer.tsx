import React from "react";

import { Typography } from "@mui/material";

const FooterDisclaimer: React.FC = () => {
    return (
        <>
            <Typography sx={{
                color: 'white',
                textAlign: 'center',
                pl: 18,
                pr: 18,
                pb: 2,
                fontSize: 12,
                fontFamily: 'Rubik',
                opacity: .6,
                position: 'absolute',
                bottom: 0
            }}>Ez-Streaming @ {new Date().getFullYear()}<br />All media content available through this application is sourced from publicly available internet streams. We do not own, host, or distribute any of the content. All content remains the property of their respective owners.</Typography>
        </>
    )
}

export default FooterDisclaimer