import { MangaList } from '../models/MangaListEntry.model.js';

const listasPermitidas = [
  'completado',
  'enProgreso',
  'planToRead',
  'dropped'
]

const añadirMangaALista = async (req, res) => {
    if(!listasPermitidas.includes(req.body.lista)) {
        return res.status(400).json({ error: 'Invalid list name provided.' });
    }
    const { mangaId, mangaTitle, mangaCoverImage, lista} = req.body;
    const { userId } = req.user;
    if(mangaId < 1) {
        return res.status(400).json({ error: 'Invalid manga ID provided.' });
    }
    //lista deberia esperar un string para determinar si el anime esta completado, en proceso, plan to watch o dropped
    if(!userId || !mangaId || !mangaTitle || !mangaCoverImage || !lista) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try{
        const userList = await MangaList.findOne({ userId });
        if (!userList) {
            const newUserList = new MangaList({
                userId,
                mangaCompletado: lista === 'completado' ? [{ mangaid: Number(mangaId), mangaTitle, mangaCoverImage }] : [],
                mangaEnProgreso: lista === 'enProgreso' ? [{ mangaid: Number(mangaId), mangaTitle, mangaCoverImage }] : [],
                mangaPlanToRead: lista === 'planToRead' ? [{ mangaid: Number(mangaId), mangaTitle, mangaCoverImage }] : [],
                mangaDropped: lista === 'dropped' ? [{ mangaid: Number(mangaId), mangaTitle, mangaCoverImage }] : []
            });
            await newUserList.save();
            return res.status(201).json({ message: 'Manga added to the list successfully.' });
        }
        
        
        const listaMap = {
            completado: 'mangaCompletado',
            enProgreso: 'mangaEnProgreso',
            planToRead: 'mangaPlanToRead',
            dropped: 'mangaDropped'
        };
        const listaKey = listaMap[lista];
        if (userList[listaKey].some(manga => manga.mangaid === Number(mangaId))) {
            return res.status(400).json({ error: 'Manga already exists in the specified list.' });
        }
        
        userList[listaKey].push({
            mangaid: Number(mangaId),
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
    const { userId } = req.user;
    try {
        const userList = await MangaList.findOne({ userId });
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
    const { mangaId, lista } = req.body;
    const { userId } = req.user;
    if (mangaId < 1) {
        return res.status(400).json({ error: 'Invalid manga ID provided.' });
    }
    //lista deberia esperar un string para determinar si el anime esta completado, en proceso, plan to watch o dropped
    try {
        const userList = await MangaList.findOne({ userId });
        if(!userList) {
            return res.status(404).json({ error: 'User list not found.' });
        }
         if (lista !== 'completado' && lista !== 'enProgreso' && lista !== 'planToRead' && lista !== 'dropped') {
            return res.status(400).json({ error: 'Invalid list name provided.' });
        }
        if (lista === 'completado' && !userList.mangaCompletado.some(manga => manga.mangaid === Number(mangaId))) {
            return res.status(404).json({ error: 'Manga not found in the completed list.' });
        }
        if (lista === 'enProgreso' && !userList.mangaEnProgreso.some(manga => manga.mangaid === Number(mangaId))) {
            return res.status(404).json({ error: 'Manga not found in the in-progress list.' });
        }
        if (lista === 'planToRead' && !userList.mangaPlanToRead.some(manga => manga.mangaid === Number(mangaId))) {
            return res.status(404).json({ error: 'Manga not found in the plan to read list.' });
        }
        if (lista === 'dropped' && !userList.mangaDropped.some(manga => manga.mangaid === Number(mangaId))) {
            return res.status(404).json({ error: 'Manga not found in the dropped list.' });
        }
        //si encuentra la lista del usuario, entonces busca el manga en la lista correspondiente y lo elimina
        if (lista === 'completado') {
            userList.mangaCompletado = userList.mangaCompletado.filter(manga => manga.mangaid !== Number(mangaId));
        } else if (lista === 'enProgreso') {
            userList.mangaEnProgreso = userList.mangaEnProgreso.filter(manga => manga.mangaid !== Number(mangaId));
        } else if (lista === 'planToRead') {
            userList.mangaPlanToRead = userList.mangaPlanToRead.filter(manga => manga.mangaid !== Number(mangaId));
        } else if (lista === 'dropped') {
            userList.mangaDropped = userList.mangaDropped.filter(manga => manga.mangaid !== Number(mangaId));
        }
        await userList.save();
        return res.status(200).json({ message: 'Manga removed from the list successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while removing the manga from the list.' });
    }
};

export { añadirMangaALista, obtenerListaUsuario, eliminarMangaDeLista };