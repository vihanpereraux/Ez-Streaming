import React from "react";

// props
interface PlayerProps {
    id: string,
    serverGroup: string
}

const getRelevantProvider = (source: string, id: string) => {
    switch (source) {
        case "vidora.su":
            return `https://vidora.su/movie/${id}?colour=a2ff00`
            break;

        case "spencerdevs.xyz":
            return `https://spencerdevs.xyz/movie/${id}?colour=a2ff00&autoPlay=true&primarycolor=a2ff00&autoNext=true&nextButton=true&poster=true`
            break;

        case "player.vidsrc.co":
            return `https://player.vidsrc.co/embed/movie/${id}?colour=a2ff00&autoPlay=true&primarycolor=a2ff00&autoNext=true&nextButton=true&poster=true&server=1`
            break;

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

        case "vidsrc.su":
            return `https://vidsrc.su/embed/movie/${id}?colour=a2ff00&adFree=true`
            break;

        case "player.vidsrc.co":
            return `https://player.vidsrc.co/embed/movie/${id}?colour=a2ff00&autoPlay=true&primarycolor=a2ff00&autoNext=true&nextButton=true&poster=true`
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