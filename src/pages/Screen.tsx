import React from "react";

const testId: number = 5433140;
const Screen: React.FC = () => {
    return (
        <>
            <iframe
                style={{ width: '60%', aspectRatio: '16/9', border: 'none' }} 
                src={`https://vidsrc.xyz/embed/movie/tt${testId}`}></iframe>
        </>
    )
}

export default Screen;