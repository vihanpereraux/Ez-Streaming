import React, { useEffect, useState } from "react";

// MUI
import { Box } from "@mui/material";

// components
import Navbar from "../components/Navbar";
import MovieCarousel from "../components/MovieCarousel";
import LoadingPreview from "../components/LoadingPreview";

// services
import { fetchMoviesInAllGenres } from "../services/movies/fetchMovies";

// props
import { MoviesProps } from "../interfaces/props";

const carouselSpacing: number = 3.5;

const genreTitles = [
    "Action Movies",
    "Adventure Movies",
    "Animation Movies",
    "Comedy Movies",
    "Crime Movies",
    "Documentary Movies",
    "Drama Movies",
    "Family Movies",
    "Fantasy Movies",
    "History Movies",
    "Horror Movies",
    "Music Movies",
    "Mystery Movies",
    "Romance Movies",
    "Science Fiction Movies",
    "TV Movie Movies",
    "Thriller Movies",
    "War Movies",
    "Western Movies"
];

const Movies: React.FC = () => {
    const [actionMovies, setActionMovies] = useState<MoviesProps[]>();
    const [adventureMovies, setAdventureMovies] = useState<MoviesProps[]>();
    const [animationMovies, setAnimationMovies] = useState<MoviesProps[]>();
    const [comedyMovies, setComedyMovies] = useState<MoviesProps[]>();
    const [crimeMovies, setCrimeMovies] = useState<MoviesProps[]>();
    const [documentaryMovies, setDocumentaryMovies] = useState<MoviesProps[]>();
    const [dramaMovies, setDramaMovies] = useState<MoviesProps[]>();
    const [familyMovies, setFamilyMovies] = useState<MoviesProps[]>();
    const [fantasyMovies, setFantasyMovies] = useState<MoviesProps[]>();
    const [historyMovies, setHistoryMovies] = useState<MoviesProps[]>();
    const [horrorMovies, setHorrorMovies] = useState<MoviesProps[]>();
    const [musicMovies, setMusicMovies] = useState<MoviesProps[]>();
    const [mysteryMovies, setMysteryMovies] = useState<MoviesProps[]>();
    const [romanceMovies, setRomanceMovies] = useState<MoviesProps[]>();
    const [scienceFictionMovies, setScienceFictionMovies] = useState<MoviesProps[]>();
    const [tvMovieMovies, setTvMovieMovies] = useState<MoviesProps[]>();
    const [thrillerMovies, setThrillerMovies] = useState<MoviesProps[]>();
    const [warMovies, setWarMovies] = useState<MoviesProps[]>();
    const [westernMovies, setWesternMovies] = useState<MoviesProps[]>();

    const fetchMovies = async () => {
        const data = await fetchMoviesInAllGenres();
        if (data) {
            setActionMovies([...(data.find(item => item.genre == "action")?.collection) as MoviesProps[]]);
            setAdventureMovies([...(data.find(item => item.genre == "adventure")?.collection) as MoviesProps[]]);
            setAnimationMovies([...(data.find(item => item.genre == "animation")?.collection) as MoviesProps[]]);
            setComedyMovies([...(data.find(item => item.genre == "comedy")?.collection) as MoviesProps[]]);
            setCrimeMovies([...(data.find(item => item.genre == "crime")?.collection) as MoviesProps[]]);
            setDocumentaryMovies([...(data.find(item => item.genre == "documentary")?.collection) as MoviesProps[]]);
            setDramaMovies([...(data.find(item => item.genre == "drama")?.collection) as MoviesProps[]]);
            setFamilyMovies([...(data.find(item => item.genre == "family")?.collection) as MoviesProps[]]);
            setFantasyMovies([...(data.find(item => item.genre == "fantasy")?.collection) as MoviesProps[]]);
            setHistoryMovies([...(data.find(item => item.genre == "history")?.collection) as MoviesProps[]]);
            setHorrorMovies([...(data.find(item => item.genre == "horror")?.collection) as MoviesProps[]]);
            setMusicMovies([...(data.find(item => item.genre == "music")?.collection) as MoviesProps[]]);
            setMysteryMovies([...(data.find(item => item.genre == "mystery")?.collection) as MoviesProps[]]);
            setRomanceMovies([...(data.find(item => item.genre == "romance")?.collection) as MoviesProps[]]);
            setScienceFictionMovies([...(data.find(item => item.genre == "scienceFiction")?.collection) as MoviesProps[]]);
            setTvMovieMovies([...(data.find(item => item.genre == "tvMovie")?.collection) as MoviesProps[]]);
            setThrillerMovies([...(data.find(item => item.genre == "thriller")?.collection) as MoviesProps[]]);
            setWarMovies([...(data.find(item => item.genre == "war")?.collection) as MoviesProps[]]);
            setWesternMovies([...(data.find(item => item.genre == "western")?.collection) as MoviesProps[]]);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    const allMovies = [
        actionMovies,
        adventureMovies,
        animationMovies,
        comedyMovies,
        crimeMovies,
        documentaryMovies,
        dramaMovies,
        familyMovies,
        fantasyMovies,
        historyMovies,
        horrorMovies,
        musicMovies,
        mysteryMovies,
        romanceMovies,
        scienceFictionMovies,
        tvMovieMovies,
        thrillerMovies,
        warMovies,
        westernMovies
    ];

    const isLoading = allMovies.some(movies => movies === undefined);

    return (
        <>
            <Navbar />

            {isLoading ? (
                <LoadingPreview />
            ) : (
                <Box sx={{ pl: { xs: 2, lg: 3 }, pr: { xs: 2, lg: 3 }, pt: 0 }}>
                    {allMovies.map((content, index) => (
                        <Box sx={{ mt: carouselSpacing }} key={index}>
                            <MovieCarousel
                                type="movie"
                                title={genreTitles[index]}
                                content={content as MoviesProps[]}
                            />
                        </Box>
                    ))}

                    <Box sx={{ mb: { xs: 20, lg: 15 } }}></Box>
                </Box>
            )}
        </>
    )
}

export default Movies;