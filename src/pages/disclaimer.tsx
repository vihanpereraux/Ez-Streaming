import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import announcementIcon from "../../public/icons/announcement-icon.json";


// component
import Navbar from "../components/navbar";

// MUI
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

// props
interface DisclaimerContentProps {
    heading: string,
    subHeading: string,
    context: string
}

const Disclaimer: React.FC = () => {
    const [content, setContent] = useState<DisclaimerContentProps[]>();

    const fetchDisclaimerData = async () => {
        const response = await fetch('/data/disclaimer-content.json');
        const data = await response.json();
        setContent([...data]);
    }

    useEffect(() => { fetchDisclaimerData() }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Navbar />
            <Box sx={{ position: 'relative' }}>
                <Box sx={{
                    pl: { xs: 1, md: 10, lg: 35 },
                    pr: { xs: 1, md: 10, lg: 35 },
                    mt: 10,
                    position: 'relative',
                    zIndex: 1,
                    minHeight: '100vh'
                }}>
                    {content && content.map((point, index) => (
                        <Box key={index}
                            sx={{
                                mt: 1.75,
                                bgcolor: 'rgba(15, 15, 15)',
                                borderRadius: 2.55,
                                p: 2.65,
                                border: '1px solid rgb(25, 25, 25)',
                                backgroundColor: 'rgba(18, 18, 18, 0.75)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                boxShadow: 'none'
                            }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{
                                    bgcolor: 'rgba(162, 255, 0, 0.08)',
                                    aspectRatio: 1,
                                    width: 50,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 2
                                }}>
                                    <Lottie style={{
                                        width: 40,
                                        marginBottom: -6,
                                        opacity: .8
                                    }}
                                        className="play-icon"
                                        animationData={announcementIcon}
                                        loop={true} />
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    ml: 1.35
                                }}>
                                    <Typography sx={{
                                        fontSize: { xs: 15, lg: 14 },
                                        fontFamily: 'Rubik',
                                        color: 'white',
                                        mt: -.25,
                                        fontWeight: 420,
                                        opacity: .9
                                    }}>{point.heading}</Typography>

                                    <Typography sx={{
                                        fontSize: { xs: 11.55, lg: 11 },
                                        fontFamily: 'Rubik',
                                        color: 'white',
                                        mt: .45,
                                        fontWeight: 380,
                                        opacity: .65
                                    }}>{point.subHeading}</Typography>
                                </Box>
                            </Box>

                            <Typography sx={{
                                mt: 1.85,
                                fontSize: { xs: 13, lg: 13.25 },
                                fontFamily: 'Rubik',
                                color: 'white',
                                lineHeight: '1.65',
                                opacity: .8
                            }}>{point.context}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default Disclaimer