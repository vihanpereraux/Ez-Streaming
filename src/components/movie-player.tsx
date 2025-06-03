import React from "react";

// MUI
import { Typography } from "@mui/material";

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
    const src = getRelevantProvider(serverGroup, id)

    return (
        <>
            <iframe
                key={id}
                allowFullScreen
                style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    border: 'none',
                    borderRadius: 12,
                    marginTop: -10
                }}
                src={src}
            />
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

export default MoviePlayer