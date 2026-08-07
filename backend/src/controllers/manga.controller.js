import { getMangaList, getMangaById } from '../api/aniListAPI.js';

const obtenerMangas = async (req, res) => {
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

const obtenerMangaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const manga = await getMangaById(Number(id));
        if (!manga) {
            return res.status(404).json({ message: 'Manga not found' });
        }
        res.status(200).json(manga);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error(`Error fetching manga with ID ${id}:`, error);
    }
};

export { obtenerMangas, obtenerMangaPorId };