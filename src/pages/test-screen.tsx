import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// components
import Navbar from "../components/Navbar";
import MovieDetails from "../components/ContentDetails";
import Credits from "../components/credits";
import Reviews from "../components/reviews";
import Videos from "../components/videos";

// services
import { getGeneralDetails } from "../services/screens/general-details";
import { getCastDetails } from "../services/screens/cast-details";
import { getReviewDetails } from "../services/screens/review-details";
import { getVideos } from "../services/screens/vidoes";

// props
import { ReviewDataProps } from "../interfaces/props";

const TestScreen: React.FC = () => {
    const location = useLocation();
    const [id, setId] = useState<string | null>(null);
    const [params, setParams] = useState<URLSearchParams | null>(null);
    const [movieDetails, setMovieDetails] = useState<any>(null);
    const [castDetails, setCastDetails] = useState<any[]>([]);
    const [reviews, setReviews] = useState<ReviewDataProps[]>([]);
    const [videoKeys, setVideoKeys] = useState<string[]>([]);

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params) {
            setParams(params);
            setId(params.get('id'));
        }
    }, [location.search]);

    const getDetails = async () => {
        if (!id) return;

        try {
            const response = await getGeneralDetails(id, "movie");
            if (response.status === 200) {
                setMovieDetails({ ...response.data });

            }
        } catch (error) {
            console.error('Failed to fetch movie details:', error);
            setMovieDetails(null);
        }
    }
    // cast details
    const getCast = async () => {
        if (!id) return;

        const response = await getCastDetails(id, "movie");
        if (response.status == 200) {
            setCastDetails(response.data as any[]);
        } else {
            console.error(`Error occured - ${response.data}`);
        }
    }

    // reviews
    const getReviews = async () => {
        if (!id) return;

        const response = await getReviewDetails(id, "movie");
        const reviewsSnapshot: ReviewDataProps[] = [];
        if (response.status == 200) {
            (response.data as any[]).map((detail: any) => {
                reviewsSnapshot.push({
                    authorUsername: detail.author,
                    review: detail.content,
                    date: detail.created_at
                })
            })
            setReviews([...reviewsSnapshot]);
        } else {
            console.error(`Error occured - ${response.data}`);
        }
    }

    // trailers and videos
    const getClips = async () => {
        if (!id) return;

        const response = await getVideos(id as string, "movie");
        if (response.status == 200) {
            const snapshot: string[] = [];
            (response.data as any[]).map((result) => { result.site == 'YouTube' && snapshot.push(result.key) });
            setVideoKeys([...snapshot]);
        } else {
            console.error(`Error occured - ${response.data}`);
        }
    }

    React.useEffect(() => {
        getDetails();
        getCast();
        getReviews();
        getClips();
    }, [id]);

    return (
        <>
            <Navbar />

            {params &&
                <iframe
                    style={{ border: 'none', width: '100%', aspectRatio: 16 / 9, height: '100%' }}
                    src={`https://stream-viewer-eta.vercel.app/?id=${params.get('id')}`}
                    allowFullScreen></iframe>}

            {/* <Box sx={{
                width: { xs: "100%", lg: "100%" },
                pl: { xs: .5, lg: 0 },
                mt: { xs: 1.5, lg: 3 },
            }}>
                {movieDetails && (
                    <MovieDetails
                        original_title={movieDetails.original_title}
                        release_date={movieDetails.release_date}
                        vote_average={movieDetails.vote_average}
                        overview={movieDetails.overview}
                        genres={movieDetails.genres}
                        runtime={movieDetails.runtime} />
                )}
            </Box> */}

            {/*  */}
            <Box sx={{ mt: 6 }}>
                {movieDetails && (
                    <Credits contentTitle={movieDetails.original_title} castDetails={castDetails} />
                )}
            </Box>

            {/*  */}
            <Box sx={{ mt: 6 }}>
                <Reviews reviews={reviews} defaultExpanded={true} />
            </Box>

            {/* trailers */}
            <Box sx={{ mt: 6, display: !false ? "block" : "none" }}>
                {videoKeys.length > 3 ? 
                (
                    <Videos videokeys={videoKeys.slice(0, 3)} />
                ) : (
                    <Videos videokeys={videoKeys} />
                )}
            </Box>
        </>
    )
}

export default TestScreen;