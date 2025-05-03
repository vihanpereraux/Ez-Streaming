import React from "react";

// props
interface PlayerProps {
    id: string,
    serverGroup: string
}

const Player: React.FC<PlayerProps> = ({ id, serverGroup }) => {
    return (
        <>
            {serverGroup === "vidfast" ? (
                <iframe
                    key={id}
                    allowFullScreen={true}
                    style={{
                        width: '100%',
                        aspectRatio: '16/9',
                        border: 'none',
                        borderRadius: 12,
                    }}
                    src={`https://vidfast.pro/movie/${id}?theme=a2ff00`}
                />
            ) :
                serverGroup === 'vidsrc' ? (
                    (
                        <iframe
                            key={id}
                            allowFullScreen={true}
                            style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                border: 'none',
                                borderRadius: 12,
                            }}
                            src={`https://vidsrc.xyz/embed/movie/${id}`}
                        />
                    )
                ) : (
                    serverGroup === 'videasy' ?  (
                        <iframe
                        key={id}
                        allowFullScreen={true}
                        style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            border: 'none',
                            borderRadius: 12,
                        }}
                        src={`https://player.videasy.net/movie/${id}`}
                    />
                    ) : (
                        <iframe
                        key={id}
                        allowFullScreen={true}
                        style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            border: 'none',
                            borderRadius: 12,
                        }}
                        src={`https://multiembed.mov/?video_id=${id}&tmdb=1`}
                    />
                    )
                )}

        </>
    )
}

export default Player