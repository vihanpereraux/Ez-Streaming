import React, { useEffect, useState } from "react";

// MUI
import { Box } from "@mui/material";

// components
import Navbar from "../components/navbar";
import LoadingPreview from "../components/loading-preview";
import TVCarousel from "../components/tv-carousel";

// services
import { fetchTvShowsInAllGenres } from "../services/tv-shows/fetchTvShows";

// props
import { MoviesProps } from "../interfaces/props";

const carouselSpacing: number = 3.5;

const genreTitles = [
    "Action & Adventure Shows",
    "Animation Shows",
    "Comedy Shows",
    "Crime Shows",
    "Documentary Shows",
    "Drama Shows",
    "Family Shows",
    "Kids Shows",
    "Mystery Shows",
    "News Shows",
    "Reality Shows",
    "Sci-Fi & Fantasy Shows",
    "Soap Shows",
    "Talk Shows",
    "War & Politics Shows",
    "Western Shows"
];

const TvShows: React.FC = () => {
    const [actionAndAdventureShows, setActionAndAdventureShows] = useState<MoviesProps[]>();
    const [animationShows, setAnimationShows] = useState<MoviesProps[]>();
    const [comedyShows, setComedyShows] = useState<MoviesProps[]>();
    const [crimeShows, setCrimeShows] = useState<MoviesProps[]>();
    const [documentaryShows, setDocumentaryShows] = useState<MoviesProps[]>();
    const [dramaShows, setDramaShows] = useState<MoviesProps[]>();
    const [familyShows, setFamilyShows] = useState<MoviesProps[]>();
    const [kidsShows, setKidsShows] = useState<MoviesProps[]>();
    const [mysteryShows, setMysteryShows] = useState<MoviesProps[]>();
    const [newsShows, setNewsShows] = useState<MoviesProps[]>();
    const [realityShows, setRealityShows] = useState<MoviesProps[]>();
    const [scifiAndFantasyShows, setScifiAndFantasyShows] = useState<MoviesProps[]>();
    const [soapShows, setSoapShows] = useState<MoviesProps[]>();
    const [talkShows, setTalkShows] = useState<MoviesProps[]>();
    const [warAndPoliticsShows, setWarAndPoliticsShows] = useState<MoviesProps[]>();
    const [westernShows, setWesternShows] = useState<MoviesProps[]>();

    const fetchMovies = async () => {
        const data = await fetchTvShowsInAllGenres();
        if (data) {
            setActionAndAdventureShows([...(data.find(item => item.genre == "actionAndAdventure")?.collection) as MoviesProps[]]);
            setAnimationShows([...(data.find(item => item.genre == "animation")?.collection) as MoviesProps[]]);
            setComedyShows([...(data.find(item => item.genre == "comedy")?.collection) as MoviesProps[]]);
            setCrimeShows([...(data.find(item => item.genre == "crime")?.collection) as MoviesProps[]]);
            setDocumentaryShows([...(data.find(item => item.genre == "documentary")?.collection) as MoviesProps[]]);
            setDramaShows([...(data.find(item => item.genre == "drama")?.collection) as MoviesProps[]]);
            setFamilyShows([...(data.find(item => item.genre == "family")?.collection) as MoviesProps[]]);
            setKidsShows([...(data.find(item => item.genre == "kids")?.collection) as MoviesProps[]]);
            setMysteryShows([...(data.find(item => item.genre == "mystery")?.collection) as MoviesProps[]]);
            setNewsShows([...(data.find(item => item.genre == "news")?.collection) as MoviesProps[]]);
            setRealityShows([...(data.find(item => item.genre == "reality")?.collection) as MoviesProps[]]);
            setScifiAndFantasyShows([...(data.find(item => item.genre == "scifiAndFantasy")?.collection) as MoviesProps[]]);
            setSoapShows([...(data.find(item => item.genre == "soap")?.collection) as MoviesProps[]]);
            setTalkShows([...(data.find(item => item.genre == "talk")?.collection) as MoviesProps[]]);
            setWarAndPoliticsShows([...(data.find(item => item.genre == "warAndPolitics")?.collection) as MoviesProps[]]);
            setWesternShows([...(data.find(item => item.genre == "western")?.collection) as MoviesProps[]]);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    const allTvShows = [
        actionAndAdventureShows,
        animationShows,
        comedyShows,
        crimeShows,
        documentaryShows,
        dramaShows,
        familyShows,
        kidsShows,
        mysteryShows,
        newsShows,
        realityShows,
        scifiAndFantasyShows,
        soapShows,
        talkShows,
        warAndPoliticsShows,
        westernShows
    ];

    const isLoading = allTvShows.some(tvShows => tvShows === undefined);

    return (
        <>
            <Navbar />

            {isLoading ? (
                <LoadingPreview />
            ) : (
                <Box sx={{ pl: { xs: 2, lg: 3 }, pr: { xs: 2, lg: 3 }, pt: 0 }}>
                    {allTvShows.map((content, index) => (
                        <Box sx={{ mt: carouselSpacing }} key={index}>
                            <TVCarousel
                                type="tv"
                                title={genreTitles[index]}
                                content={content as MoviesProps[]}
                            />
                        </Box>
                    ))}

                    <Box sx={{ mb: { xs: 12, lg: 12 } }} />
                </Box>
            )}
        </>
    )
}

export default TvShows;