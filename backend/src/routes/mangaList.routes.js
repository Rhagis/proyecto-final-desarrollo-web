import express from 'express';
import { añadirMangaALista, obtenerListaUsuario, eliminarMangaDeLista } from '../controllers/mangaList.controller.js';

const router = express.Router();    

router.post('/add', añadirMangaALista);
router.get('/:userId', obtenerListaUsuario);
router.delete('/remove', eliminarMangaDeLista);

export default router;