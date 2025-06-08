import React, { useEffect, useState } from "react";

// MUI
import { Box } from "@mui/material";

// components
import BannerCarosuel from "../components/banner-carousel";
import MovieCarousel from "../components/movie-carousel";
import TVCarousel from "../components/tv-carousel";
import LoadingPreview from "../components/loading-preview";
import Navbar from "../components/navbar";

// services
import {
    getBannerContent,
    getTrendingMovies,
    getTopRatedMovies,
    getUpcommingMovies,
    getMoviesByGenre,
    getMoviesByProvider,
    getTvShowsByProvider
} from "../services/api";

// props
import { MoviesProps } from "../interfaces/props";

const carouselSpacing = 3.5;

const Home: React.FC = () => {
    const [bannerContent, setBannerContent] = useState<MoviesProps[]>();
    const [trendingMovies, setTrendingMovies] = useState<MoviesProps[]>();
    const [topRatedMovies, setTopRatedMovies] = useState<MoviesProps[]>();
    const [upcommingMovies, setUpcommingMovies] = useState<MoviesProps[]>();
    const [familyMovies, setFamilyMovies] = useState<MoviesProps[]>();
    const [romanceMovies, setRomanceMovies] = useState<MoviesProps[]>();
    const [horrorMovies, setHorrorMovies] = useState<MoviesProps[]>();
    const [appleTvMovies, setAppleTvMovies] = useState<MoviesProps[]>();
    const [netflixMovies, setNetflixMovies] = useState<MoviesProps[]>();
    const [amazonPrimeMovies, setAmazonPrimeMovies] = useState<MoviesProps[]>();
    const [huluMovies, setHuluMovies] = useState<MoviesProps[]>();
    const [appleTvShows, setAppleTvShows] = useState<MoviesProps[]>();
    const [netflixShows, setNetflixShows] = useState<MoviesProps[]>();
    const [amazonPrimeShows, setAmazonPrimeShows] = useState<MoviesProps[]>();
    const [huluShows, setHuluShows] = useState<MoviesProps[]>();

    useEffect(() => {
        const fetchData = async () => {
            const [
                bannerContentRes,
                trendingMoviesRes,
                topRatedMoviesRes,
                upcommingMoviesRes,
                familyMoviesRes,
                romanceMoviesRes,
                horrorMoviesRes,
                appleTvMoviesRes,
                netflixMoviesRes,
                amazonPrimeMoviesRes,
                huluMoviesRes,
                appleTvShowsRes,
                netflixShowsRes,
                amazonPrimeShowsRes,
                huluShowsRes
            ] = await Promise.all([
                getBannerContent([]),
                getTrendingMovies([]),
                getTopRatedMovies([]),
                getUpcommingMovies([]),
                getMoviesByGenre([], "10751"),
                getMoviesByGenre([], "10749"),
                getMoviesByGenre([], "27"),
                getMoviesByProvider([], "2"),
                getMoviesByProvider([], "8"),
                getMoviesByProvider([], "9"),
                getMoviesByProvider([], "15"),
                getTvShowsByProvider([], "2"),
                getTvShowsByProvider([], "8"),
                getTvShowsByProvider([], "9"),
                getTvShowsByProvider([], "15")
            ]);

            if (bannerContentRes) setBannerContent([...bannerContentRes]);
            if (trendingMoviesRes) setTrendingMovies([...trendingMoviesRes]);
            if (topRatedMoviesRes) setTopRatedMovies([...topRatedMoviesRes]);
            if (upcommingMoviesRes) setUpcommingMovies([...upcommingMoviesRes]);
            if (familyMoviesRes) setFamilyMovies([...familyMoviesRes]);
            if (romanceMoviesRes) setRomanceMovies([...romanceMoviesRes]);
            if (horrorMoviesRes) setHorrorMovies([...horrorMoviesRes]);
            if (appleTvMoviesRes) setAppleTvMovies([...appleTvMoviesRes]);
            if (netflixMoviesRes) setNetflixMovies([...netflixMoviesRes]);
            if (amazonPrimeMoviesRes) setAmazonPrimeMovies([...amazonPrimeMoviesRes]);
            if (huluMoviesRes) setHuluMovies([...huluMoviesRes]);
            if (appleTvShowsRes) setAppleTvShows([...appleTvShowsRes]);
            if (netflixShowsRes) setNetflixShows([...netflixShowsRes]);
            if (amazonPrimeShowsRes) setAmazonPrimeShows([...amazonPrimeShowsRes]);
            if (huluShowsRes) setHuluShows([...huluShowsRes]);
        };

        fetchData();
    }, []);

    // local storage configs
    useEffect(() => {
        const watchedMovies = localStorage.getItem('watchedMovies');
        const watchedTvShows = localStorage.getItem('watchedTvShows');

        if (!watchedMovies && !watchedTvShows) {
            localStorage.setItem('watchedTvShows', JSON.stringify([] as MoviesProps[]));
            localStorage.setItem('watchedMovies', JSON.stringify([] as MoviesProps[]));
        }

        if (!(JSON.parse(localStorage.getItem('adDisclaimerDisabled') || 'false'))) {
            localStorage.setItem('adDisclaimerDisabled', JSON.stringify(false));
        }
    }, []);

    const isLoaded =
        bannerContent &&
        trendingMovies &&
        upcommingMovies &&
        familyMovies &&
        horrorMovies &&
        romanceMovies &&
        topRatedMovies &&
        appleTvMovies &&
        netflixMovies &&
        amazonPrimeMovies &&
        huluMovies &&
        appleTvShows &&
        netflixShows &&
        amazonPrimeShows &&
        huluShows;

    return (
        <>
            <Navbar />
            <Box sx={{
                pl: { xs: 1, lg: 2 },
                pr: { xs: 1, lg: 2 },
                pt: 0
            }}>
                {isLoaded ? (
                    <>
                        <Box sx={{ mt: carouselSpacing }}>
                            <BannerCarosuel type="tv" content={bannerContent!} />
                        </Box>
                        {[
                            { type: "movie", title: "Trending Movies", content: trendingMovies! },
                            { type: "movie", title: "Now Streaming Movies", content: upcommingMovies! },

                            { type: "tv", title: "TV Shows From Apple TV", content: appleTvShows! },
                            { type: "movie", title: "Movies From Apple TV", content: appleTvMovies! },

                            { type: "tv", title: "TV Shows From Netflix", content: netflixShows! },
                            { type: "movie", title: "Movies From Netflix", content: netflixMovies! },

                            { type: "tv", title: "TV Shows From Amazon Prime", content: amazonPrimeShows! },
                            { type: "movie", title: "Movies From Amazon Prime", content: amazonPrimeMovies! },

                            { type: "tv", title: "TV Shows from Hulu", content: huluShows! },
                            { type: "movie", title: "Hulu Movies", content: huluMovies! },

                            { type: "movie", title: "Family Movies", content: familyMovies! },

                            { type: "movie", title: "Horror Movies", content: horrorMovies! },
                            
                            { type: "movie", title: "Romance Movies", content: romanceMovies! },

                            { type: "movie", title: "All Time Favourites", content: topRatedMovies! }
                        ].map((carousel, index) => (
                            <Box sx={{ mt: carouselSpacing }} key={index}>
                                {carousel.type == "movie" ? (
                                    <MovieCarousel
                                        type={carousel.type}
                                        title={carousel.title}
                                        content={carousel.content} />
                                ) : (
                                    <TVCarousel
                                        type={carousel.type}
                                        title={carousel.title}
                                        content={carousel.content} />
                                )}

                            </Box>
                        ))}
                    </>
                ) : (
                    <LoadingPreview />
                )}
            </Box>
            <Box sx={{ mb: { xs: 12, lg: 12 } }} />
        </>
    );
};

export default Home;