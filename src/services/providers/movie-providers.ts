// props
import { MovieProviderDetailsProps } from "../../interfaces/props"

// all movie providers
export const getAllMovieProviders = () => {
    let providerDetails: MovieProviderDetailsProps[] = [];
    // desktop and tablet providers 
    if (window.innerWidth > 700) {
        [{
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
        },
        {
            displayName: "Cinema Canvas",
            providerName: "multiembed.mov"
        }].map((item) => {
            providerDetails.push({
                displayName: item.displayName,
                providerName: item.providerName
            })
        })
    } else {
        // mobile friendly providers
        [{
            displayName: "VimStar",
            providerName: "videsrc.cc"
        }].map((item) => {
            providerDetails.push({
                displayName: item.displayName,
                providerName: item.providerName
            })
        })
    }

    return providerDetails;
}
