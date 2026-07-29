import { getAnimeList } from '../api/aniListAPI.js';

const obtenerAnimes = async (req, res) => {
    
        const page = Number(req.query.page) || 1;
        const perPage = Number(req.query.perPage) || 50;
        const animeList = await getAnimeList(page, perPage);
        if (!animeList) {
            console.error('No anime list found for the given parameters.');
            return res.status(404).json({ error: 'No anime list found' });
        }
        res.status(200).json(animeList);
    
    
};

export { obtenerAnimes };