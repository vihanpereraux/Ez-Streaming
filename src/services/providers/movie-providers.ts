// props
import { MovieProviderDetailsProps } from "../../interfaces/props"

export const getAllMovieProviders = () => {
    let providerDetails: MovieProviderDetailsProps[] = [];
    // desktop and tablet providers 
    if (window.innerWidth > 700) {
        [{
            displayName: "KingStar",
            providerName: "vidora.su"
        },
        {
            displayName: "Jolliby",
            providerName: "spencerdevs.xyz"
        },
        {
            displayName: "Premify",
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
            displayName: "Chad Player",
            providerName: "vidsrc.su"
        },
        {
            displayName: "Jolliby",
            providerName: "spencerdevs.xyz"
        },
        {
            displayName: "KingStar",
            providerName: "vidora.su"
        },
        {
            displayName: "Vimstar",
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
