import { getAnimeList, getAnimeById } from '../api/aniListAPI.js';

const obtenerAnimes = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const perPage = Number(req.query.perPage) || 50;
        const animeList = await getAnimeList(page, perPage);
        if (!animeList) {
            console.error('No anime list found for the given parameters.');
            return res.status(404).json({ error: 'No anime list found' });
        }
        res.status(200).json(animeList);
    } catch (error) {
        console.error('Error fetching anime list:', error);
        res.status(500).json({ error: 'An error occurred while fetching the anime list.' });
    }
    
    
};

const obtenerAnimePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const anime = await getAnimeById(Number(id));
        if (!anime) {
            console.error(`No anime found with ID: ${id}`);
            return res.status(404).json({ error: 'Anime not found' });
        }
        res.status(200).json(anime);
    }
    catch (error) {
        console.error(`Error fetching anime with ID ${id}:`, error);
        res.status(500).json({ error: 'An error occurred while fetching the anime.' });
    }
};

export { obtenerAnimes, obtenerAnimePorId };