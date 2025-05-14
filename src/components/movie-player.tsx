import React from "react";

// props
interface PlayerProps {
    id: string,
    serverGroup: string
}

const getRelevantProvider = (source: string, id: string) => {
    switch (source) {
        case "videsrc.xyz":
            return `https://vidsrc.xyz/embed/movie/${id}`
            break;

        case "vidjoy.pro":
            return `https://vidjoy.pro/embed/movie/${id}`
            break;

        case "videsrc.cc":
            return `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=false`
            break;

        case "videasy.net":
            return `https://player.videasy.net/movie/${id}`
            break;

        case "multiembed.mov":
            return `https://multiembed.mov/?video_id=${id}&tmdb=1`
            break;

        default:
            return `https://vidfast.pro/movie/${id}?theme=a2ff00`
            break;
    }
}

const MoviePlayer: React.FC<PlayerProps> = ({ id, serverGroup }) => {
    const src = getRelevantProvider(serverGroup, id)

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

export default MoviePlayer