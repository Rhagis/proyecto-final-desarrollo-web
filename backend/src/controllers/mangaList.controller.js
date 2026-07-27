import { UserList } from '../models/AnimeListEntry.model.js';

const añadirMangaALista = async (req, res) => {
    const { userId, mangaId, mangaTitle, mangaCoverImage, lista} = req.body;
    //lista deberia esperar un string para determinar si el anime esta completado, en proceso, plan to watch o dropped
    try{
        const userList = await UserList.findOne({ userId });
        if (!userList) {
            const newUserList = new UserList({
                userId,
                completado: lista === 'completado' ? [{ mangaid: mangaId, mangaTitle, mangaCoverImage }] : [],
                enProgreso: lista === 'enProgreso' ? [{ mangaid: mangaId, mangaTitle, mangaCoverImage }] : [],
                planToWatch: lista === 'planToWatch' ? [{ mangaid: mangaId, mangaTitle, mangaCoverImage }] : [],
                dropped: lista === 'dropped' ? [{ mangaid: mangaId, mangaTitle, mangaCoverImage }] : []
            });
            await newUserList.save();
            return res.status(201).json({ message: 'Manga added to the list successfully.' });
        }
        if (lista !== 'completado' && lista !== 'enProgreso' && lista !== 'planToWatch' && lista !== 'dropped') {
            return res.status(400).json({ error: 'Invalid list name provided.' });
        }
        if (userList[lista].some(manga => manga.mangaid === mangaId)) {
            return res.status(400).json({ error: 'Manga already exists in the specified list.' });
        }
        
        userList[lista].push({
            mangaid: mangaId,
            mangaTitle,
            mangaCoverImage
        });
        await userList.save();
        return res.status(200).json({ message: 'Manga added to the list successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding the manga to the list.' });
    }
};

const obtenerListaUsuario = async (req, res) => {
    const { userId } = req.params;
    try {
        const userList = await UserList.findOne({ userId });
        if (!userList) {
            return res.status(404).json({ error: 'User list not found.' });
        }
        return res.status(200).json(userList);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while retrieving the user list.' });
    }
};

const eliminarMangaDeLista = async (req, res) => {
    const { userId, mangaId, lista } = req.body;
    //lista deberia esperar un string para determinar si el anime esta completado, en proceso, plan to watch o dropped
    try {
        const userList = await UserList.findOne({ userId });
        if (!userList) {
            return res.status(404).json({ error: 'User list not found.' });
        }
        if (lista !== 'completado' && lista !== 'enProgreso' && lista !== 'planToWatch' && lista !== 'dropped') {
            return res.status(400).json({ error: 'Invalid list name provided.' });
        }
        if (lista === 'completado' && !userList.completado.some(manga => manga.mangaid === mangaId)) {
            return res.status(404).json({ error: 'Manga not found in the completed list.' });
        }
        if (lista === 'enProgreso' && !userList.enProgreso.some(manga => manga.mangaid === mangaId)) {
            return res.status(404).json({ error: 'Manga not found in the in-progress list.' });
        }
        if (lista === 'planToWatch' && !userList.planToWatch.some(manga => manga.mangaid === mangaId)) {
            return res.status(404).json({ error: 'Manga not found in the plan to watch list.' });
        }
        if (lista === 'dropped' && !userList.dropped.some(manga => manga.mangaid === mangaId)) {
            return res.status(404).json({ error: 'Manga not found in the dropped list.' });
        }
        userList[lista] = userList[lista].filter(manga => manga.mangaid !== mangaId);
        await userList.save();
        return res.status(200).json({ message: 'Manga removed from the list successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while removing the manga from the list.' });
    }
};

export { añadirMangaALista, obtenerListaUsuario, eliminarMangaDeLista };