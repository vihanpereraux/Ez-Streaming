import React from "react";

// MUI
import { Typography } from "@mui/material";

const ValidationMessage: React.FC = () => {
    return (
        <>
            <Typography sx={{
                color: '#a2ff00',
                textAlign: 'center',
                position: 'absolute',
                transform: 'translateX(-50%)',
                left: '50%',
                mt: 8,
                fontFamily: 'Rubik',
                fontWeight: 450
            }}>No results found : (</Typography>
        </>
    )
}

export default ValidationMessage