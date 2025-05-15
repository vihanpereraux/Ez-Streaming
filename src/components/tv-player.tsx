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

        case "multiembed.mov":
            return `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
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