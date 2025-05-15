import React from "react";

// props
interface PlayerProps {
    id: string,
    serverGroup: string
}

const getRelevantProvider = (source: string, id: string) => {
    switch (source) {
        case "videsrc.xyz":
            if (window.innerWidth < 628) {
                return `https://player.vidsrc.co/embed/movie/${id}?adFree=true`
            } else {
                return `https://player.vidsrc.co/embed/movie/${id}`
            }
            break;

        case "vidjoy.pro":
            if (window.innerWidth < 628) {
                return `https://vidjoy.pro/embed/movie/${id}?adFree=true`
            } else {
                return `https://vidjoy.pro/embed/movie/${id}`
            }
            break;

        case "videsrc.cc":
            if (window.innerWidth < 628) {
                return `https://vidsrc.cc/v2/embed/movie/${id}?adFree=true`
            } else {
                return `https://vidsrc.cc/v2/embed/movie/${id}`
            }
            break;

        case "videasy.net":
            if (window.innerWidth < 628) {
                return `https://player.videasy.net/movie/${id}?adFree=true`
            } else {
                return `https://player.videasy.net/movie/${id}`
            }
            break;

        case "multiembed.mov":
            if (window.innerWidth < 628) {
                return `https://vidsrc.su/embed/movie/${id}?adFree=true`
            } else {
                return `https://vidsrc.su/embed/movie/${id}`
            }
            break;

        default:
            if (window.innerWidth < 628) {
                return `https://vidfast.pro/movie/${id}?theme=a2ff00&adFree=true`
            } else {
                return `https://vidfast.pro/movie/${id}?theme=a2ff00`
            }
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