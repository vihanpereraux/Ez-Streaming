export const getCastDetails = async (movieId: string, type: string) => {
    try {
        const response = await fetch(type === "movie" ?
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
            :
            `https://api.themoviedb.org/3/tv/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        const data = await response.json();
        const castArr: any[] = data.cast;
        return ({ status: 200, data: castArr });
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return ({ status: 500, data: error });
    }
};