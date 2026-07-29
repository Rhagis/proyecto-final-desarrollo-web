import { getMangaList } from '../api/aniListAPI.js';

export const obtenerMangas = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 50;
    try {
        const mangas = await getMangaList(page, perPage);
        res.status(200).json(mangas);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error('Error fetching mangas:', error);
    }
};
