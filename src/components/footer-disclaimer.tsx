import React from "react";

const FooterDisclaimer: React.FC = () => {
    return(
        <>
            <p style={{ 
                color: 'white',
                textAlign: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 13,
                marginTop: '100px',
                fontFamily: 'Rubik',
                opacity: .6
             }}>Ez-Streaming @ {new Date().getFullYear()} · All media content available through this application is sourced from publicly available internet streams. We do not own, host, or distribute any of the content. All content remains the property of their respective owners.</p>
        </>
    )
}

export default FooterDisclaimer