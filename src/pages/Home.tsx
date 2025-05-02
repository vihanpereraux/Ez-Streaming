import React, {
    useEffect,
    useState
} from "react";

// MUI
import { Box } from "@mui/material";

// components
import BannerCarosuel from "../components/BannerCarousel";
import MovieCarousel from "../components/MovieCarousel";
import LoadingPreview from "../components/LoadingPreview";
import Navbar from "../components/Navbar";

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

const carouselSpacing: number = 5;

const Home: React.FC = () => {
    const [bannerContent, setBannerContent] = useState<MoviesProps[]>();
    const [trendingMovies, setTrendingMovies] = useState<MoviesProps[]>();
    const [topRatedMovies, setTopRatedMovies] = useState<MoviesProps[]>();
    const [upcommingMovies, setUpcommingMovies] = useState<MoviesProps[]>();
    const [familyMovies, setFamilyMovies] = useState<MoviesProps[]>();
    const [romanceMovies, setRomanceMovies] = useState<MoviesProps[]>();
    const [horrorMovies, setHorrorMovies] = useState<MoviesProps[]>();
    // movie states for providers
    const [appleTvMovies, setAppleTvMovies] = useState<MoviesProps[]>();
    const [netflixMovies, setNetflixMovies] = useState<MoviesProps[]>();
    const [amazonPrimeMovies, setAmazonPrimeMovies] = useState<MoviesProps[]>();
    const [huluMovies, setHuluMovies] = useState<MoviesProps[]>();
    // tv states for providers
    const [appleTvShows, setAppleTvShows] = useState<MoviesProps[]>();
    const [netflixShows, setNetflixShows] = useState<MoviesProps[]>();
    const [amazonPrimeShows, setAmazonPrimeShows] = useState<MoviesProps[]>();
    const [huluShows, setHuluShows] = useState<MoviesProps[]>();


    const getData = async () => {
        const bannerContentLocalArr: MoviesProps[] = []
        const bannerContent = await getBannerContent(bannerContentLocalArr);
        if (bannerContent) { setBannerContent([...bannerContent]); }

        const trendingMoviesLocalArr: MoviesProps[] = [];
        const trendingMovies = await getTrendingMovies(trendingMoviesLocalArr);
        if (trendingMovies) { setTrendingMovies([...trendingMovies]); }

        const topRatedMoviesLocalArr: MoviesProps[] = [];
        const topRatedMovies = await getTopRatedMovies(topRatedMoviesLocalArr);
        if (topRatedMovies) { setTopRatedMovies([...topRatedMovies]); }

        const upcommingMoviesLocalArr: MoviesProps[] = [];
        const upcommingMovies = await getUpcommingMovies(upcommingMoviesLocalArr);
        if (upcommingMovies) { setUpcommingMovies([...upcommingMovies]); }

        const crimeMoviesLocalArr: MoviesProps[] = [];
        const familyMovies = await getMoviesByGenre(crimeMoviesLocalArr, "10751");
        if (familyMovies) { setFamilyMovies([...familyMovies]); }

        const documentaryMoviesLocalArr: MoviesProps[] = [];
        const romanceMovies = await getMoviesByGenre(documentaryMoviesLocalArr, "10749");
        if (romanceMovies) { setRomanceMovies([...romanceMovies]); }

        const thrillerMoviesLocalArr: MoviesProps[] = [];
        const horrorMovies = await getMoviesByGenre(thrillerMoviesLocalArr, "27");
        if (horrorMovies) { setHorrorMovies([...horrorMovies]); }

        // providers movie collection
        const appletvMoviesLocalArr: MoviesProps[] = [];
        const appleTvMovies = await getMoviesByProvider(appletvMoviesLocalArr, "2");
        if (appleTvMovies) { setAppleTvMovies([...appleTvMovies]); }

        const netflixMoviesLocalArr: MoviesProps[] = [];
        const netflixMovies = await getMoviesByProvider(netflixMoviesLocalArr, "8");
        if (netflixMovies) { setNetflixMovies([...netflixMovies]); }

        const amazonPrimeMoviesLocalArr: MoviesProps[] = [];
        const amazonPrimeMovies = await getMoviesByProvider(amazonPrimeMoviesLocalArr, "9");
        if (amazonPrimeMovies) { setAmazonPrimeMovies([...amazonPrimeMovies]); }

        const huluMoviesLocalArr: MoviesProps[] = [];
        const huluMovies = await getMoviesByProvider(huluMoviesLocalArr, "15");
        if (huluMovies) { setHuluMovies([...huluMovies]); }

        // providers tv collection
        const appletvShowsLocalArr: MoviesProps[] = [];
        const appleTvShows = await getTvShowsByProvider(appletvShowsLocalArr, "2");
        if (appleTvShows) { setAppleTvShows([...appleTvShows]); }

        const netflixShowsLocalArr: MoviesProps[] = [];
        const netflixShows = await getTvShowsByProvider(netflixShowsLocalArr, "8");
        if (netflixShows) { setNetflixShows([...netflixShows]); }

        const amazonPrimeShowsLocalArr: MoviesProps[] = [];
        const amazonPrimeShows = await getTvShowsByProvider(amazonPrimeShowsLocalArr, "9");
        if (amazonPrimeShows) { setAmazonPrimeShows([...amazonPrimeShows]); }

        const huluShowsLocalArr: MoviesProps[] = [];
        const huluShows = await getTvShowsByProvider(huluShowsLocalArr, "15");
        if (huluShows) { setHuluShows([...huluShows]); }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Navbar />
            <Box sx={{ pl: { xs: 2, lg: 3 }, pr: { xs: 2, lg: 3 }, pt: 0 }}>
                {bannerContent &&
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
                    huluShows ? (
                    <>
                        {/* tv banner */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <BannerCarosuel
                                type="tv"
                                content={bannerContent} />
                        </Box>

                        {/* carosuel - trending movies */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Trending Movies"
                                content={trendingMovies} />
                        </Box>

                        {/* carosuel - apple tv shows */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="tv"
                                title="TV Shows From Apple TV"
                                content={appleTvShows} />
                        </Box>

                        {/* carosuel - now streaming movies */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Now Streaming Movies"
                                content={upcommingMovies} />
                        </Box>

                        {/* netflix movies */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Netflix Movies"
                                content={netflixMovies} />
                        </Box>

                        {/* carosuel - family movies  */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Family Movies"
                                content={familyMovies} />
                        </Box>

                        {/* carosuel - netflix tv shows */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="tv"
                                title="TV Shows From Netflix"
                                content={netflixShows} />
                        </Box>

                        {/* apple tv movies */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Apple TV Movies"
                                content={appleTvMovies} />
                        </Box>

                        {/* carosuel - horror movies */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Horror Movies"
                                content={horrorMovies} />
                        </Box>

                        {/* carosuel - amazon prime tv shows */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="tv"
                                title="TV Shows From Amazon Prime"
                                content={amazonPrimeShows} />
                        </Box>

                        {/* amazon prime movies */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Amazon Prime Movies"
                                content={amazonPrimeMovies} />
                        </Box>

                        {/* carosuel - romance movies */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Romance Movies"
                                content={romanceMovies} />
                        </Box>

                        {/* hulu movies */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Hulu Movies"
                                content={huluMovies} />
                        </Box>

                        {/* carosuel - top rated movies */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Top Rated Movies"
                                content={topRatedMovies} />
                        </Box>

                        {/* carosuel - hulu tv shows */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="tv"
                                title="TV Shows from Hulu"
                                content={huluShows} />
                        </Box>
                    </>
                ) : (
                    <LoadingPreview />
                )}
            </Box >
            <Box sx={{ mb: { xs: 16, lg: 15 } }}></Box>
        </>
    )
}

export default Home;