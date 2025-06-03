// props
import { StreamProviderProps } from "../../interfaces/props"

export const getAllMovieProviders = () => {
    let providerDetails: StreamProviderProps[] = [];
    // desktop and tablet providers 
    if (window.innerWidth > 700) {
        [{
            displayName: "KingStar",
            providerName: "vidora.su",
            premium: true,
        },
        {
            displayName: "Premify",
            providerName: "player.vidsrc.co",
            note: {
                note: 'Play / pause button is in the middle of the screen',
                device: 'mobile'
            },
            premium: true,
        },
        {
            displayName: "Enigma",
            providerName: "vidsrc.su",
            premium: true,
        },
        {
            displayName: "Jolliby",
            providerName: "spencerdevs.xyz",
            premium: true,
        },
        {
            displayName: "Chad Player",
            providerName: "videsrc.xyz",
            premium: false,
        },
        {
            displayName: "VimStar",
            providerName: "videsrc.cc",
            premium: false,
        },
        {
            displayName: "Popcorn Bunjie",
            providerName: "videasy.net",
            premium: false,
        },
        {
            displayName: "Star Cinema",
            providerName: "vidjoy.pro",
            premium: false,
        },
        {
            displayName: "Reel Magic",
            providerName: "vidfast.pro",
            premium: false,
        }].map((item) => {
            providerDetails.push({
                displayName: item.displayName,
                providerName: item.providerName,
                note: item.note && { note: item.note.note, device: item.note.device },
                premium: item.premium
            })
        })
    } else {
        // mobile friendly providers
        [{
            displayName: "Enigma",
            providerName: "vidsrc.su",
            premium: true,
        },
        {
            displayName: "Jolliby",
            providerName: "spencerdevs.xyz",
            premium: true,
        },
        {
            displayName: "KingStar",
            providerName: "vidora.su",
            premium: true,
        },
        {
            displayName: "Premify",
            providerName: "player.vidsrc.co",
            premium: true,
            note: {
                note: '* pPlay / pause button is in the middle of the screen for this provider',
                device: 'mobile'
            }
        }].map((item) => {
            providerDetails.push({
                displayName: item.displayName,
                providerName: item.providerName,
                note: item.note && { note: item.note.note, device: item.note.device },
                premium: item.premium
            })
        })
    }

    return providerDetails;
}
