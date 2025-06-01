import React from "react";

// props
interface PlayerProps {
    id: string,
    serverGroup: string,
    season: string,
    episode: string
}

const getRelevantProvider = (id: string, source: string, season: string, episode: string) => {
    switch (source) {
        case "vidora.su":
            return `https://vidora.su/tv/${id}/${season}/${episode}?colour=a2ff00`
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

const TvPlayer: React.FC<PlayerProps> = ({ id, serverGroup, season, episode }) => {
    const src = getRelevantProvider(id, serverGroup, season, episode)

    return (
        <>
            <iframe
                key={id}
                allowFullScreen={true}
                style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    border: 'none',
                    borderRadius: 12,
                }}
                src={src}
            />

        </>
    )
}

export default TvPlayer