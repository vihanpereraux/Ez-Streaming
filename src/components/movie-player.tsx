import React from "react";
import Lottie from "lottie-react";
import indexingIcon from "../../public/icons/indexing-icon.json";

// MUI
import { Typography, Box } from "@mui/material";

// props
interface PlayerProps {
    id: string,
    serverGroup: string,
    note?: {
        note: string,
        device: string
    }
}

const getRelevantProvider = (source: string, id: string) => {
    switch (source) {
        case "vidora.su":
            return `https://vidora.su/movie/${id}?colour=a2ff00&pausescreen=true`
            break;

        case "vidsrc.su":
            return `https://vidsrc.su/embed/movie/${id}?colour=a2ff00&adFree=true`
            break;

        case "spencerdevs.xyz":
            return `https://spencerdevs.xyz/movie/${id}?colour=a2ff00&autoPlay=true&primarycolor=a2ff00&autoNext=true&nextButton=true&poster=true`
            break;

        case "player.vidsrc.co":
            return `https://player.vidsrc.co/embed/movie/${id}?colour=a2ff00&autoPlay=true&primarycolor=a2ff00&autoNext=true&nextButton=true&poster=true&server=1`
            break;

        case "videsrc.xyz":
            return `https://vidsrc.xyz/embed/movie/${id}&adFree=true`
            break;

        case "videsrc.cc":
            return `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=false&adfree=true`
            break;

        case "vidjoy.pro":
            return `https://vidjoy.pro/embed/movie/${id}`
            break;

        case "videasy.net":
            return `https://player.videasy.net/movie/${id}`
            break;

        default:
            return `https://vidfast.pro/movie/${id}?theme=a2ff00`
            break;
    }
}

const noteDisplayConfig = (device: string) => {
    switch (device) {
        case 'mobile':
            return { xs: 'block', md: 'none', lg: 'none' }
            break;

        case 'tab':
            return { xs: 'none', md: 'block', lg: 'none' }
            break;

        case 'pc':
            return { xs: 'none', md: 'none', lg: 'block' }
            break;

        default:
            break;
    }
}

const MoviePlayer: React.FC<PlayerProps> = ({ id, serverGroup, note }) => {
    const [isIframeLoaded, setIsIframeLoaded] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const src = getRelevantProvider(serverGroup, id)

    return (
        <>
            <Box sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                // border: '1px solid red',
                mt: 2
            }}>
                {/* iframe loading animation */}
                {/* !isIframeLoaded */}
                {!isIframeLoaded && (
                    <Box sx={{
                        position: 'absolute',
                        top: -40,
                        right: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'black',
                        borderRadius: 4,
                        // border: '1px solid yellow'
                    }}>
                        <Lottie style={{ width: 200, height: 150, marginTop: -75 }} animationData={indexingIcon} loop={true} />
                        <Typography sx={{
                            color: 'white',
                            textAlign: 'center',
                            fontFamily: 'Rubik',
                            fontSize: 12,
                            mt: -2
                        }}>
                            Preparing your stream... Please wait a moment !
                        </Typography>
                    </Box>
                )}
                {error && (
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100%',
                        height: '102%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'black',
                        borderRadius: 4,
                    }}>
                        <Lottie style={{ width: 200, height: 150, marginTop: -100 }} animationData={indexingIcon} loop={true} />
                        <Typography sx={{
                            color: 'white',
                            textAlign: 'center',
                            fontFamily: 'Rubik',
                            fontSize: 12,
                            mt: -2
                        }}>
                            Something went wrong... Please switch to another stream !
                        </Typography>
                    </Box>
                )}
                <iframe key={id}
                    allowFullScreen
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        aspectRatio: '16/9',
                        border: 'none',
                        borderRadius: 12,
                        marginTop: -10,
                        opacity: isIframeLoaded ? 1 : 0,
                    }}
                    src={src}
                    onLoad={() => { setIsIframeLoaded(true) }}
                    onError={() => { setError(true) }} />
            </Box>
            {note && (
                <Typography sx={{
                    color: 'white',
                    fontSize: 8,
                    textAlign: 'center',
                    mt: .75,
                    mb: .75,
                    display: noteDisplayConfig(note.device),
                    fontFamily: 'Rubik'
                }}>{note.note}</Typography>
            )}
        </>
    )
}

export default MoviePlayer