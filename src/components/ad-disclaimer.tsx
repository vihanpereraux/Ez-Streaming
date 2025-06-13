import React from "react";

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';

// props
interface props {
    setIsContinuePressed: React.Dispatch<React.SetStateAction<boolean>>
}

const AdDisclaimer: React.FC<props> = ({ setIsContinuePressed }) => {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    const [isAdDisclaimerDisabled] = React.useState<boolean>(
        JSON.parse(localStorage.getItem('adDisclaimerDisabled') || 'false')
    );

    return (
        <>
            <Box>
                <Modal
                    open={!isAdDisclaimerDisabled && open}
                    onClose={handleClose}
                    hideBackdrop
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '95%', md: 380, lg: 380 },
                        bgcolor: 'black',
                        border: '1px solid rgba(162, 255, 0, .35)',
                        outline: 'none',
                        boxShadow: 24,
                        p: 3,
                        pb: 6,
                        color: 'white',
                        borderRadius: 4
                    }}>
                        <Typography sx={{
                            fontFamily: 'Rubik',
                            fontSize: 17,
                            fontWeight: 420,
                            lineHeight: 1.65,
                            textAlign: 'center',
                            color: '#a2ff00'
                        }}>
                            Disclaimer
                        </Typography>

                        <Typography sx={{
                            fontFamily: 'Rubik',
                            fontSize: 13,
                            fontWeight: 380,
                            lineHeight: 1.65,
                            mt: 3,
                            color: 'white',
                            opacity: .9
                        }}>
                            <span style={{ color: '#a2ff00' }}>Ez Streaming</span> is an ad-free streaming platform, but some content providers
                            (non-premium ones) may have advertisements within their content
                            which is beyond our control.
                        </Typography>

                        <Typography sx={{
                            mt: 2,
                            fontFamily: 'Rubik',
                            fontSize: 13,
                            fontWeight: 380,
                            lineHeight: 1.65,
                            color: 'white',
                            opacity: .9
                        }}>
                            Hence We strongly advise you to use <a style={{ textDecoration: 'none', color: '#a2ff00' }} href="https://ublockorigin.com/" target="_blank">uBlock Origin </a>
                            browser extension before streaming your content. Happy streaming !
                        </Typography>

                        <Box sx={{
                            ml: -1,
                            display: 'flex',
                            alignItems: 'center',
                            mt: 2,
                        }}>
                            <Checkbox onChange={() => {
                                localStorage.setItem('adDisclaimerDisabled', JSON.stringify(true));
                            }} />
                            <Typography sx={{
                                color: 'white',
                                fontFamily: 'Rubik',
                                fontSize: 13,
                                fontWeight: 380,
                                opacity: .9
                            }}>Don't show this disclaimer again</Typography>
                        </Box>

                        <Button
                            variant="contained"
                            sx={{
                                width: '100%',
                                height: 45,
                                mt: 3,
                                background: '#a2ff00',
                                color: 'black',
                                fontFamily: 'Rubik',
                                borderRadius: 2,
                                fontWeight: 550,
                                fontSize: 13
                            }} onClick={() => {
                                handleClose();
                                setIsContinuePressed(true);
                            }}>Continue </Button>
                    </Box>
                </Modal>
            </Box>
        </>
    )
}

export default AdDisclaimer