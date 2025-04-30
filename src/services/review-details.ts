export const getReviewDetails = async (movieId: string, type: string) => {
    try {
        const response = await fetch(type === "movie" ?
            `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
            :
            `https://api.themoviedb.org/3/tv/${movieId}/reviews?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        const data = await response.json();
        const reviewData: any[] = data.results;
        return ({ status: 200, data: reviewData });
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return ({ status: 500, data: error });
    }
};