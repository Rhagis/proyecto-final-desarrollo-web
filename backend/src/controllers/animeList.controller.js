import { AnimeList } from '../models/AnimeListEntry.model.js';

const listasPermitidas = [
  'completado',
  'enProgreso',
  'planToWatch',
  'dropped'
]

const añadirAnimeALista = async (req, res) => {
    if(!listasPermitidas.includes(req.body.lista)) {
        return res.status(400).json({ error: 'Invalid list name provided.' });
    }
    const { userId, animeId, animeTitle, animeCoverImage, lista} = req.body;
    if (lista !== 'completado' && lista !== 'enProgreso' && lista !== 'planToWatch' && lista !== 'dropped') {
            return res.status(400).json({ error: 'Invalid list name provided.' });
        }
    //lista deberia esperar un string para determinar si el anime esta completado, en proceso, plan to watch o dropped
    try{
        const userList = await AnimeList.findOne({ userId });
        
        if (!userList) {
            const newUserList = new AnimeList({
                userId,
                animeCompletado: lista === 'completado' ? [{ animeid: Number(animeId), animeTitle, animeCoverImage }] : [],
                animeEnProgreso: lista === 'enProgreso' ? [{ animeid: Number(animeId), animeTitle, animeCoverImage }] : [],
                animePlanToWatch: lista === 'planToWatch' ? [{ animeid: Number(animeId), animeTitle, animeCoverImage }] : [],
                animeDropped: lista === 'dropped' ? [{ animeid: Number(animeId), animeTitle, animeCoverImage }] : []
            });
            await newUserList.save();
            return res.status(201).json({ message: 'Anime added to the list successfully.' });
        }
        
        const listaMap = {
            completado: 'animeCompletado',
            enProgreso: 'animeEnProgreso',
            planToWatch: 'animePlanToWatch',
            dropped: 'animeDropped'
        };
        const listaKey = listaMap[lista];
        if (userList[listaKey].some(anime => anime.animeid === Number(animeId))) {
            return res.status(400).json({ error: 'Anime already exists in the specified list.' });
        }
        
        userList[listaKey].push({
            animeid: Number(animeId),
            animeTitle,
            animeCoverImage
        });
        await userList.save();
        return res.status(200).json({ message: 'Anime added to the list successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding the anime to the list.' });
    }
};

const obtenerListaUsuario = async (req, res) => {
    const { userId } = req.params;
    try {
        const userList = await AnimeList.findOne({ userId });
        if (!userList) {
            return res.status(404).json({ error: 'User list not found.' });
        }
        return res.status(200).json(userList);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while retrieving the user list.' });
    }
};

const eliminarAnimeDeLista = async (req, res) => {
    if(!listasPermitidas.includes(req.body.lista)) {
        return res.status(400).json({ error: 'Invalid list name provided.' });
    }
    const { userId, animeId, lista } = req.body;
    //lista deberia esperar un string para determinar si el anime esta completado, en proceso, plan to watch o dropped
    try {
        const userList = await AnimeList.findOne({ userId });
        if (!userList) {
            return res.status(404).json({ error: 'User list not found.' });
        }
        if (lista !== 'completado' && lista !== 'enProgreso' && lista !== 'planToWatch' && lista !== 'dropped') {
            return res.status(400).json({ error: 'Invalid list name provided.' });
        }
        if (lista === 'completado' && !userList.animeCompletado.some(anime => anime.animeid === Number(animeId))) {
            return res.status(404).json({ error: 'Anime not found in the completed list.' });
        }
        if (lista === 'enProgreso' && !userList.animeEnProgreso.some(anime => anime.animeid === Number(animeId))) {
            return res.status(404).json({ error: 'Anime not found in the in-progress list.' });
        }
        if (lista === 'planToWatch' && !userList.animePlanToWatch.some(anime => anime.animeid === Number(animeId))) {
            return res.status(404).json({ error: 'Anime not found in the plan to watch list.' });
        }
        if (lista === 'dropped' && !userList.animeDropped.some(anime => anime.animeid === Number(animeId))) {
            return res.status(404).json({ error: 'Anime not found in the dropped list.' });
        }
        if (lista === 'completado') {
            userList.animeCompletado = userList.animeCompletado.filter(anime => anime.animeid !== Number(animeId));
        } else if (lista === 'enProgreso') {
            userList.animeEnProgreso = userList.animeEnProgreso.filter(anime => anime.animeid !== Number(animeId));
        } else if (lista === 'planToWatch') {
            userList.animePlanToWatch = userList.animePlanToWatch.filter(anime => anime.animeid !== Number(animeId));
        } else if (lista === 'dropped') {
            userList.animeDropped = userList.animeDropped.filter(anime => anime.animeid !== Number(animeId));
        }
        await userList.save();
        return res.status(200).json({ message: 'Anime removed from the list successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while removing the anime from the list.' });
    }
};

export { añadirAnimeALista, obtenerListaUsuario, eliminarAnimeDeLista };