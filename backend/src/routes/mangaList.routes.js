import express from 'express';
import { validarToken } from '../middleware/validate.middleware.js';
import { añadirMangaALista, obtenerListaUsuario, eliminarMangaDeLista } from '../controllers/mangaList.controller.js';

const router = express.Router();    

router.post('/add', validarToken, añadirMangaALista);
router.get('/:userId', validarToken, obtenerListaUsuario);
router.delete('/remove', validarToken, eliminarMangaDeLista);

export default router;