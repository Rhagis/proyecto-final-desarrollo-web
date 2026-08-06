import { añadirAnimeALista, obtenerListaUsuario, eliminarAnimeDeLista } from "../controllers/animeList.controller.js";
import express from "express";
import { validarToken } from "../middleware/validate.middleware.js";

const router = express.Router();

router.get('/:userId', validarToken, obtenerListaUsuario);
router.post('/add', validarToken, añadirAnimeALista);
router.delete('/remove', validarToken, eliminarAnimeDeLista);

export default router;