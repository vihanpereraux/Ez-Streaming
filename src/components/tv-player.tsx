import React from "react";

// MUI
import { Typography } from "@mui/material";

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
    const src = getRelevantProvider(id, serverGroup, season, episode)

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

export default TvPlayer