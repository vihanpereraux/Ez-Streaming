export const getGeneralDetails = async (contentId: string, type: string) => {
    try {
        const response = await fetch(type === "movie" ?
            `https://api.themoviedb.org/3/movie/${contentId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
            :
            `https://api.themoviedb.org/3/tv/${contentId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        const data = await response.json();
        return ({ status: 200, data: data });
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return ({ status: 500, data: error });
    }
};