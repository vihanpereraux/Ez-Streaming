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
        case "videsrc.xyz":
            return `https://player.vidsrc.co/embed/tv/${id}/${season}/${episode}?adFree=true`
            break;

        case "videsrc.cc":
            return `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}?autoPlay=false&adFree=true`
            break;

        case "vidjoy.pro":
            return `https://vidjoy.pro/embed/tv/${id}/${season}/${episode}?adFree=true`
            break;

        case "videasy.net":
            return `https://player.videasy.net/tv/${id}/${season}/${episode}?adFree=true`
            break;

        case "multiembed.mov":
            return `https://vidsrc.su/embed/tv/${id}/${season}/${episode}?adFree=true`
            break;

        default:
            return `https://vidfast.pro/tv/${id}/${season}/${episode}?theme=a2ff00&adFree=true`
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