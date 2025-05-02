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
    const [crimeMovies, setCrimeMovies] = useState<MoviesProps[]>();
    const [documentaryMovies, setDocumentaryMovies] = useState<MoviesProps[]>();
    const [thrillerMovies, setThrillerMovies] = useState<MoviesProps[]>();

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
        const crimeMovies = await getMoviesByGenre(crimeMoviesLocalArr, "80");
        if (crimeMovies) { setCrimeMovies([...crimeMovies]); }

        const documentaryMoviesLocalArr: MoviesProps[] = [];
        const docMovies = await getMoviesByGenre(documentaryMoviesLocalArr, "99");
        if (docMovies) { setDocumentaryMovies([...docMovies]); }

        const thrillerMoviesLocalArr: MoviesProps[] = [];
        const thrillerMovies = await getMoviesByGenre(thrillerMoviesLocalArr, "53");
        if (thrillerMovies) { setThrillerMovies([...thrillerMovies]); }
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
                    crimeMovies &&
                    thrillerMovies &&
                    documentaryMovies &&
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

                        {/* carosuel - top rated movies  */}
                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Crime Movies"
                                content={crimeMovies} />
                        </Box>

                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Thriller Movies"
                                content={thrillerMovies} />
                        </Box>

                        <Box sx={{ mt: carouselSpacing }}>
                            <MovieCarousel
                                type="movie"
                                title="Documentary Movies"
                                content={documentaryMovies} />
                        </Box>

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