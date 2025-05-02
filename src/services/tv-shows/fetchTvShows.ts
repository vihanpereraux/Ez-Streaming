// props
import { MoviesProps } from './../../interfaces/props';
interface GenreProps {
    genre: string,
    id: string
}
import { CollectionArrayProps } from './../../interfaces/props';

// api service
import { getTvShowsByGenre } from './api';

export const fetchTvShowsInAllGenres = async () => {
    const genreCollection: GenreProps[] = [
        { genre: 'actionAndAdventure', id: '10759' },
        { genre: 'animation', id: '16' },
        { genre: 'comedy', id: '35' },
        { genre: 'crime', id: '80' },
        { genre: 'documentary', id: '99' },
        { genre: 'drama', id: '18' },
        { genre: 'family', id: '10751' },
        { genre: 'kids', id: '10762' },
        { genre: 'mystery', id: '9648' },
        { genre: 'news', id: '10763' },
        { genre: 'reality', id: '10764' },
        { genre: 'scifiAndFantasy', id: '10765' },
        { genre: 'soap', id: '10766' },
        { genre: 'talk', id: '10767' },
        { genre: 'warAndPolitics', id: '10768' },
        { genre: 'western', id: '37' }
    ];

    try {
        const tvShowsCollectorArr: CollectionArrayProps[] = [];
        for (const genre of genreCollection) {
            const tvShowsSnapshot: MoviesProps[] = [];
            const movies = await getTvShowsByGenre(tvShowsSnapshot, genre.id);
            tvShowsCollectorArr.push({
                genre: genre.genre,
                collection: movies as MoviesProps[]
            });
        }
        return tvShowsCollectorArr;
    } catch (error) {
        console.error(`Error occured - ${error}`);
    }
}
