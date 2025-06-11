import React from "react";
import Lottie from "lottie-react";
import indexingIcon from "../../public/icons/indexing-icon.json";

// MUI
import { Typography, Box } from "@mui/material";

// props
interface PlayerProps {
    id: string,
    serverGroup: string,
    season: string,
    episode: string,
    note?: {
        note: string,
        device: string
    }
}

const getRelevantProvider = (id: string, source: string, season: string, episode: string) => {
    switch (source) {
        case "vidora.su":
            return `https://vidora.su/tv/${id}/${season}/${episode}?colour=a2ff00&&pausescreen=true`
            break;

        case "vidsrc.su":
            return `https://vidsrc.su/embed/tv/${id}/${season}/${episode}`
            break;

        case "spencerdevs.xyz":
            return `https://spencerdevs.xyz/tv/${id}/${season}/${episode}?theme=a2ff00&autoPlay=true&autoNext=true&nextButton=true&poster=true`
            break;

        case "player.vidsrc.co":
            return `https://player.vidsrc.co/embed/tv/${id}/${season}/${episode}?colour=a2ff00&autoPlay=true&primarycolor=a2ff00&autoNext=true&nextButton=true&poster=true&server=1`
            break;

        case "videsrc.xyz":
            return `https://vidsrc.xyz/embed/tv/${id}/${season}/${episode}`
            break;

        case "videsrc.cc":
            return `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}?autoPlay=false`
            break;

        case "vidjoy.pro":
            return `https://vidjoy.pro/embed/tv/${id}/${season}/${episode}`
            break;

        case "videasy.net":
            return `https://player.videasy.net/tv/${id}/${season}/${episode}`
            break;

        default:
            return `https://vidfast.pro/tv/${id}/${season}/${episode}?theme=a2ff00`
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

const TvPlayer: React.FC<PlayerProps> = ({ id, serverGroup, season, episode, note }) => {
    const [isIframeLoaded, setIsIframeLoaded] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const src = getRelevantProvider(id, serverGroup, season, episode)

    return (
        <>
            <Box sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
            }}>
                {/* iframe loading animation */}
                {!isIframeLoaded && (
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100%',
                        height: '100%',
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
                <iframe
                    key={id}
                    allowFullScreen
                    style={{
                        width: '100%',
                        aspectRatio: '16/9',
                        border: 'none',
                        borderRadius: 12,
                        marginTop: -10,
                        opacity: isIframeLoaded ? 1 : 0
                    }}
                    src={src}
                    onLoad={() => { setIsIframeLoaded(true) }}
                    onError={() => { setError(true) }}
                />
            </Box>

            {note && (
                <Typography sx={{
                    color: 'white',
                    fontSize: 10,
                    textAlign: 'center',
                    mt: .75,
                    mb: .75,
                    display: noteDisplayConfig(note.device)
                }}>{note.note}</Typography>
            )}
        </>
    )
}

export default TvPlayer