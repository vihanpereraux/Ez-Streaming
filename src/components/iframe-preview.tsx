import React from "react";

// props
import { IframePreviewProps } from "../interfaces/props";

// MUI
import { Box } from "@mui/material";

const IframePreview: React.FC<IframePreviewProps> = ({ title, videoId }) => {
    const [isIframeLoaded, setIsIframeLoaded] = React.useState<boolean>(false);

    return (
        <>
            <Box sx={{
                width: '100%',
                aspectRatio: 16 / 9,
                position: 'relative'
            }}>
                {!isIframeLoaded && (
                    <Box style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        background: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}><Box className="loading-spinner card-loading-spinner"></Box>
                    </Box>
                )}
                <iframe
                    key={videoId}
                    loading="lazy"
                    style={{
                        position: 'absolute',
                        border: 'none',
                        outline: 'none',
                        borderRadius: 10,
                        aspectRatio: 16 / 9,
                        left: 0,
                        top: 0,
                        opacity: isIframeLoaded ? 1 : 0
                    }}
                    width={window.innerWidth < 600 ? '100%' : '98%'}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`Clips from ${title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onLoad={() => { setIsIframeLoaded(true); }}
                ></iframe>
            </Box>
        </>
    );
}

export default IframePreview