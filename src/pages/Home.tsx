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
    getMoviesByGenre
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
                    topRatedMovies ? (
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

                        {/* carosuel - now streaming movies */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Now Streaming Movies"
                                content={upcommingMovies} />
                        </Box>

                        {/* carosuel - family movies  */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Family Movies"
                                content={familyMovies} />
                        </Box>

                        {/* carosuel - horror movies */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Horror Movies"
                                content={horrorMovies} />
                        </Box>

                        {/* carosuel - romance movies */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Romance Movies"
                                content={romanceMovies} />
                        </Box>

                        {/* carosuel - top rated movies */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Top Rated Movies"
                                content={topRatedMovies} />
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