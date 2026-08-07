import express from 'express';
import { obtenerMangas, obtenerMangaPorId } from '../controllers/manga.controller.js';


const router = express.Router();

router.get("/", obtenerMangas);
router.get("/:id", obtenerMangaPorId);

export default router;