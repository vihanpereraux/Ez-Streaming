import React, { useEffect, useState } from "react";

// component
import Navbar from "../components/Navbar";

// MUI
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

// props
interface DisclaimerContentProps {
    heading: string,
    context: string
}

const Disclaimer: React.FC = () => {
    const [content, setContent] = useState<DisclaimerContentProps[]>();

    const fetchDisclaimerData = async () => {
        const response = await fetch('/data/disclaimer-content.json');
        const data = await response.json();
        setContent([...data]);
    }

    useEffect(() => {
        fetchDisclaimerData()
    }, [])

    return (
        <>
            <Navbar />

            <Box sx={{ mt: { xs: 8, lg: 10 } }}>
                {content && content.map((point, index) => (
                    <Box key={index}
                        sx={{
                            mt: 5,
                            pl: { xs: 2, sm: 3, lg: 15 },
                            pr: { xs: 2, sm: 3, lg: 15 }
                        }}>
                        <Typography sx={{
                            fontSize: { xs: 18, lg: 18 },
                            fontFamily: 'Rubik',
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 450,
                            opacity: .9
                        }}>{point.heading}</Typography>

                        <Typography sx={{
                            mt: 1,
                            fontSize: { xs: '14px', lg: '15px' },
                            fontFamily: 'Rubik',
                            color: 'white',
                            textAlign: 'center',
                            lineHeight: '1.65',
                            opacity: .85
                        }}>{point.context}</Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={{ mb: { xs: 16, lg: 15 } }} />
        </>
    )
}

export default Disclaimer