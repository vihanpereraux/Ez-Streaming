export const getVideos = async (id: string, type: string) => {
    try {
        const response = await fetch(type === "movie" ?
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
            :
            `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        const data = await response.json();
        const results: any[] = data.results;
        return ({ status: 200, data: results });
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return ({ status: 500, data: error });
    }
};