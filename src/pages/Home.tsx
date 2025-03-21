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

// services
import {
    getBannerContent,
    getTrendingMovies,
    getTopRatedMovies,
    getUpcommingMovies,
    getMoviesByGenre
} from "../services/Api";

// props
import { MoviesProps } from "../interfaces/props";

const carouselSpacing: number = 8;

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
            <Box sx={{ pl: { xs: 2, lg: 6 }, pr: {xs: 2, lg: 6 }, pt: 6 }}>
            {bannerContent ? (
                < Box sx={{ mt: carouselSpacing }}>
                    <BannerCarosuel
                        type="tv"
                        content={bannerContent} />
                </Box>
            ) : (<LoadingPreview />)}

            {/* carosuel - trending movies */}
            <Box sx={{ mt: carouselSpacing }}>
                {trendingMovies ? (
                    <MovieCarousel
                        type="movie"
                        title="Newest Trending Movies"
                        content={trendingMovies} />
                ) : (<LoadingPreview />)}
            </Box>

            {/* carosuel - now streaming movies */}
            <Box sx={{ mt: carouselSpacing }}>
                {upcommingMovies ? (
                    <MovieCarousel
                        type="movie"
                        title="Now Streaming Movies"
                        content={upcommingMovies} />
                ) : (<LoadingPreview />)}

            </Box>

            {/* carosuel - top rated movies  */}
            <Box sx={{ mt: carouselSpacing }}>
                {crimeMovies ? (
                    <MovieCarousel
                        type="movie"
                        title="Crime & Action Movies"
                        content={crimeMovies} />
                ) : (<LoadingPreview />)}

            </Box>

            <Box sx={{ mt: carouselSpacing }}>
                {thrillerMovies ? (
                    <MovieCarousel
                        type="movie"
                        title="Thriller Movies"
                        content={thrillerMovies} />
                ) : (<LoadingPreview />)}

            </Box>

            <Box sx={{ mt: carouselSpacing }}>
                {documentaryMovies ? (
                    <MovieCarousel
                        type="movie"
                        title="Documentery Movies"
                        content={documentaryMovies} />
                ) : (<LoadingPreview />)}

            </Box>

            <Box sx={{ mt: carouselSpacing }}>
                {topRatedMovies ? (
                    <MovieCarousel
                        type="movie"
                        title="Top Rated Movies"
                        content={topRatedMovies} />
                ) : (<LoadingPreview />)}

            </Box>
        </Box >
        </>
    )
}

export default Home;