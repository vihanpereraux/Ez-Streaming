import React from "react";

// props
interface PlayerProps {
    id: string,
    serverGroup: string
}

const getRelevantProvider = (source: string, id: string) => {
    switch (source) {
        case "videsrc.xyz":
            return `https://player.vidsrc.co/embed/movie/${id}?adFree=true`
            break;

        case "vidjoy.pro":
            return `https://vidjoy.pro/embed/movie/${id}?adFree=true`
            break;

        case "videsrc.cc":
            return `https://vidsrc.cc/v2/embed/movie/${id}?adFree=true`
            break;

        case "videasy.net":
            return `https://player.videasy.net/movie/${id}?adFree=true`
            break;

        case "multiembed.mov":
            return `https://vidsrc.su/embed/movie/${id}?adFree=true`
            break;

        default:
            return `https://vidfast.pro/movie/${id}?theme=a2ff00&adFree=true`
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