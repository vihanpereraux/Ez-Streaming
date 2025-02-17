import React, {
    useEffect,
    useState
} from "react";

// MUI
import { Box } from "@mui/material";

// components
import BannerCarosuel from "../components/BannerCarousel";
import MovieCarousel from "../components/MovieCarousel";

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
        const lol = await getBannerContent(bannerContentLocalArr);
        if (lol) { setBannerContent([...lol]); }

        const lol2 = await getTrendingMovies(trendingMoviesLocalArr);
        if (lol2) { setTrendingMovies([...lol2]); }

        const lol3 = await getTopRatedMovies(topRatedMoviesLocalArr);
        if (lol3) { setTopRatedMovies([...lol3]); }

        const lol4 = await getUpcommingMovies(upcommingMoviesLocalArr);
        if (lol4) { setUpcommingMovies([...lol4]); }

        const lol5 = await getMoviesByGenre(crimeMoviesLocalArr, "80");
        if (lol5) { setCrimeMovies([...lol5]); }

        const lol6 = await getMoviesByGenre(documentaryMoviesLocalArr, "99");
        if (lol6) { setDocumentaryMovies([...lol6]); }

        const lol7 = await getMoviesByGenre(thrillerMoviesLocalArr, "53");
        if (lol7) { setThrillerMovies([...lol7]); }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Box sx={{ pl: 6, pr: 6, pt: 5 }}>
                {bannerContent ? (
                    < Box sx={{ mt: carouselSpacing }}>
                        <BannerCarosuel
                            type="banner"
                            content={bannerContent} />
                    </Box>
                ) : (
                    <div><p style={{ color: 'white' }}>Loading !</p></div>
                )}

                {/* carosuel - trending movies */}
                <Box sx={{ mt: carouselSpacing }}>
                    {trendingMovies ? (
                        <MovieCarousel
                            type="movie"
                            title="Newest Trending Movies"
                            trendingMovies={trendingMovies} />
                    ) : (<div><p style={{ color: 'white' }}>Loading !</p></div>)}
                </Box>

                {/* carosuel - now streaming movies */}
                <Box sx={{ mt: carouselSpacing }}>
                    {upcommingMovies ? (
                        <MovieCarousel
                            type="movie"
                            title="Now Streaming Movies"
                            trendingMovies={upcommingMovies} />
                    ) : (<div><p style={{ color: 'white' }}>Loading !</p></div>)}

                </Box>

                {/* carosuel - top rated movies  */}
                <Box sx={{ mt: carouselSpacing }}>
                    {crimeMovies ? (
                        <MovieCarousel
                            type="movie"
                            title="Crime & Action Movies"
                            trendingMovies={crimeMovies} />
                    ) : (<div><p style={{ color: 'white' }}>Loading !</p></div>)}

                </Box>

                <Box sx={{ mt: carouselSpacing }}>
                    {thrillerMovies ? (
                        <MovieCarousel
                            type="movie"
                            title="Thriller Movies"
                            trendingMovies={thrillerMovies} />
                    ) : (<div><p style={{ color: 'white' }}>Loading !</p></div>)}

                </Box>

                <Box sx={{ mt: carouselSpacing }}>
                    {documentaryMovies ? (
                        <MovieCarousel
                            type="movie"
                            title="Documentery Movies"
                            trendingMovies={documentaryMovies} />
                    ) : (<div><p style={{ color: 'white' }}>Loading !</p></div>)}

                </Box>

                <Box sx={{ mt: carouselSpacing }}>
                    {topRatedMovies ? (
                        <MovieCarousel
                            type="movie"
                            title="Top Rated Movies"
                            trendingMovies={topRatedMovies} />
                    ) : (<div><p style={{ color: 'white' }}>Loading !</p></div>)}

                </Box>
            </Box >
        </>
    )
}

export default Home;