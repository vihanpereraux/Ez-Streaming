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
                    src={`https://vidsrc.xyz/embed/movie/${id}`}
                />
            )}

        </>
    )
}

export default Player