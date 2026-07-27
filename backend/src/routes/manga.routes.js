import express from 'express';
import { obtenerMangas } from '../controllers/manga.controller.js';


const router = express.Router();

router.get("/", obtenerMangas);

export default router;