import React from "react";

const spinnerStyle: React.CSSProperties = {
    margin: "40px auto 16px auto",
    border: "3px solid #222",
    borderTop: "3px solid #a2ff00",
    borderRadius: "50%",
    width: 60,
    height: 60,
    animation: "spin 1s linear infinite",
    display: "block"
};


const LoadingPreview: React.FC = () => {
    return (
        <>
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }
                `}
            </style>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '85vh'
            }}>
                <div style={spinnerStyle}></div>
                <p style={{
                    fontFamily: 'Rubik',
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 13,
                    letterSpacing: 1,
                    marginTop: 15,
                    fontWeight: 450,
                    textTransform: 'uppercase',
                }}>Loading your <span style={{ color: '#a2ff00' }}>experience</span></p>
            </div>
        </>
    )
}

export default LoadingPreview