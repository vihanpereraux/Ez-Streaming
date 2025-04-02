import React from "react";

// MUI
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

const Games: React.FC = () => {
    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}>
                <Typography
                    variant="h5"
                    component="h1"
                    gutterBottom
                    sx={{
                        color: "#a2ff00",
                        fontFamily: "Rubik"
                    }}>
                    Coming Soon !
                </Typography>
            </Box>
        </>
    );
}

export default Games;