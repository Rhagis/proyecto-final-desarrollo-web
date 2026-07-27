import { getMangaList } from '../api/aniListAPI.js';

export const obtenerMangas = async (req, res) => {
    const { page, perPage } = req.query;
    try {
        const mangas = await getMangaList(page, perPage);
        res.status(200).json(mangas);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error('Error fetching mangas:', error);
    }
};
