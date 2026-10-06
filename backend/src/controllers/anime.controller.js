import { getAnimeList, getAnimeById, getAnimeBanner, getAnimeCurrentSeason } from '../api/aniListAPI.js';

const obtenerAnimes = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const perPage = Number(req.query.perPage) || 50;
        const animeList = await getAnimeList(page, perPage);
        if (!animeList) {
           
            return res.status(404).json({ error: 'No anime list found' });
        }
        res.status(200).json(animeList);
    } catch (error) {
        console.error('Error fetching anime list:', error);
        res.status(500).json({ error: 'An error occurred while fetching the anime list.' });
    }
    
    
};

const obtenerAnimeBanner = async (req, res) => {
    try {
        const banner = await getAnimeBanner();
        if (!banner) {
            return res.status(404).json({ error: 'No anime banner found' });
        }
        res.status(200).json(banner);
    } catch (error) {
        console.error('Error fetching anime banner:', error);
        res.status(500).json({ error: 'An error occurred while fetching the anime banner.' });
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

const obtenerAnimeTemporadaActual = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const perPage = Number(req.query.perPage) || 50;
        const animeCurrentSeason = await getAnimeCurrentSeason(page, perPage);
        if (!animeCurrentSeason) {
            return res.status(404).json({ error: 'No anime found for the current season' });
        }
        res.status(200).json(animeCurrentSeason);
    } catch (error) {
        console.error('Error fetching anime for the current season:', error);
        res.status(500).json({ error: 'An error occurred while fetching the anime for the current season.' });
    }
};

export { obtenerAnimes, obtenerAnimePorId, obtenerAnimeBanner, obtenerAnimeTemporadaActual };