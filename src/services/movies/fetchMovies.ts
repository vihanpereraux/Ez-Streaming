// props
import { MoviesProps } from './../../interfaces/props';
interface GenreProps {
    genre: string,
    id: string
}
import { CollectionArrayProps } from './../../interfaces/props';

// api service
import { getMoviesByGenre } from '../api';

export const fetchMoviesInAllGenres = async () => {
    const genreCollection: GenreProps[] = [
        { genre: 'action', id: '28' },
        { genre: 'adventure', id: '12' },
        { genre: 'animation', id: '16' },
        { genre: 'comedy', id: '35' },
        { genre: 'crime', id: '80' },
        { genre: 'documentary', id: '99' },
        { genre: 'drama', id: '18' },
        { genre: 'family', id: '10751' },
        { genre: 'fantasy', id: '14' },
        { genre: 'history', id: '36' },
        { genre: 'horror', id: '27' },
        { genre: 'music', id: '10402' },
        { genre: 'mystery', id: '9648' },
        { genre: 'romance', id: '10749' },
        { genre: 'scienceFiction', id: '878' },
        { genre: 'tvMovie', id: '10770' },
        { genre: 'thriller', id: '53' },
        { genre: 'war', id: '10752' },
        { genre: 'western', id: '37' }
    ];

    try {
        const moviesCollectorArr: CollectionArrayProps[] = [];
        for (const genre of genreCollection) {
            const moviesSnapshot: MoviesProps[] = [];
            const movies = await getMoviesByGenre(moviesSnapshot, genre.id);
            moviesCollectorArr.push({
                genre: genre.genre,
                collection: movies as MoviesProps[]
            });
        }
        return moviesCollectorArr;
    } catch (error) {
        console.error(`Error occured - ${error}`);
    }
}
