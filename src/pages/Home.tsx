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

// banner content
const bannerContentLocalArr: MoviesProps[] = []
// other movies
const trendingMoviesLocalArr: MoviesProps[] = [];
const upcommingMoviesLocalArr: MoviesProps[] = [];
const topRatedMoviesLocalArr: MoviesProps[] = [];
// movies by genres
const crimeMoviesLocalArr: MoviesProps[] = [];
const documentaryMoviesLocalArr: MoviesProps[] = [];
const thrillerMoviesLocalArr: MoviesProps[] = [];


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
        const bannerContent = await getBannerContent(bannerContentLocalArr);
        if (bannerContent) { setBannerContent([...bannerContent]); }

        const trendingMovies = await getTrendingMovies(trendingMoviesLocalArr);
        if (trendingMovies) { setTrendingMovies([...trendingMovies]); }

        const topRatedMovies = await getTopRatedMovies(topRatedMoviesLocalArr);
        if (topRatedMovies) { setTopRatedMovies([...topRatedMovies]); }

        const upcommingMovies = await getUpcommingMovies(upcommingMoviesLocalArr);
        if (upcommingMovies) { setUpcommingMovies([...upcommingMovies]); }

        const crimeMovies = await getMoviesByGenre(crimeMoviesLocalArr, "80");
        if (crimeMovies) { setCrimeMovies([...crimeMovies]); }

        const docMovies = await getMoviesByGenre(documentaryMoviesLocalArr, "99");
        if (docMovies) { setDocumentaryMovies([...docMovies]); }

        const thrillerMovies = await getMoviesByGenre(thrillerMoviesLocalArr, "53");
        if (thrillerMovies) { setThrillerMovies([...thrillerMovies]); }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Box sx={{ pl: 6, pr: 6, pt: 6 }}>
                {bannerContent ? (
                    < Box sx={{ mt: carouselSpacing }}>
                        <BannerCarosuel
                            type="banner"
                            content={bannerContent} />
                    </Box>
                ) : (<LoadingPreview />)}

                {/* carosuel - trending movies */}
                <Box sx={{ mt: carouselSpacing }}>
                    {trendingMovies ? (
                        <MovieCarousel
                            type="movie"
                            title="Newest Trending Movies"
                            trendingMovies={trendingMovies} />
                    ) : (<LoadingPreview />)}
                </Box>

                {/* carosuel - now streaming movies */}
                <Box sx={{ mt: carouselSpacing }}>
                    {upcommingMovies ? (
                        <MovieCarousel
                            type="movie"
                            title="Now Streaming Movies"
                            trendingMovies={upcommingMovies} />
                    ) : (<LoadingPreview />)}

                </Box>

                {/* carosuel - top rated movies  */}
                <Box sx={{ mt: carouselSpacing }}>
                    {crimeMovies ? (
                        <MovieCarousel
                            type="movie"
                            title="Crime & Action Movies"
                            trendingMovies={crimeMovies} />
                    ) : (<LoadingPreview />)}

                </Box>

                <Box sx={{ mt: carouselSpacing }}>
                    {thrillerMovies ? (
                        <MovieCarousel
                            type="movie"
                            title="Thriller Movies"
                            trendingMovies={thrillerMovies} />
                    ) : (<LoadingPreview />)}

                </Box>

                <Box sx={{ mt: carouselSpacing }}>
                    {documentaryMovies ? (
                        <MovieCarousel
                            type="movie"
                            title="Documentery Movies"
                            trendingMovies={documentaryMovies} />
                    ) : (<LoadingPreview />)}

                </Box>

                <Box sx={{ mt: carouselSpacing }}>
                    {topRatedMovies ? (
                        <MovieCarousel
                            type="movie"
                            title="Top Rated Movies"
                            trendingMovies={topRatedMovies} />
                    ) : (<LoadingPreview />)}

                </Box>
            </Box >
        </>
    )
}

export default Home;