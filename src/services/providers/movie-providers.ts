// props
import { StreamProviderProps } from "../../interfaces/props"

export const getAllMovieProviders = () => {
    let providerDetails: StreamProviderProps[] = [];
    // desktop and tablet providers 
    if (window.innerWidth > 700) {
        [{
            displayName: "🜲\u00A0 KingStar",
            providerName: "vidora.su"
        },
        {
            displayName: "🜲\u00A0 Enigma",
            providerName: "vidsrc.su"
        },
        {
            displayName: "🜲\u00A0 Jolliby",
            providerName: "spencerdevs.xyz"
        },
        {
            displayName: "🜲\u00A0 Premify",
            providerName: "player.vidsrc.co"
        },
        {
            displayName: "Chad Player",
            providerName: "videsrc.xyz"
        },
        {
            displayName: "VimStar",
            providerName: "videsrc.cc"
        },
        {
            displayName: "Popcorn Bunjie",
            providerName: "videasy.net"
        },
        {
            displayName: "Star Cinema",
            providerName: "vidjoy.pro"
        },
        {
            displayName: "Reel Magic",
            providerName: "vidfast.pro"
        }].map((item) => {
            providerDetails.push({
                displayName: item.displayName,
                providerName: item.providerName
            })
        })
    } else {
        // mobile friendly providers
        [{
            displayName: "🜲\u00A0 Enigma",
            providerName: "vidsrc.su"
        },
        {
            displayName: "🜲\u00A0 Jolliby",
            providerName: "spencerdevs.xyz"
        },
        {
            displayName: "🜲\u00A0 KingStar",
            providerName: "vidora.su"
        },
        {
            displayName: "🜲\u00A0 Premify",
            providerName: "player.vidsrc.co"
        }].map((item) => {
            providerDetails.push({
                displayName: item.displayName,
                providerName: item.providerName
            })
        })
    }

    return providerDetails;
}
