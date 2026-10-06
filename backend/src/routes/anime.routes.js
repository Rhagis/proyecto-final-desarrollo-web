import express from "express";
import { obtenerAnimes, obtenerAnimePorId, obtenerAnimeBanner, obtenerAnimeTemporadaActual } from "../controllers/anime.controller.js";

const router = express.Router();

router.get("/", obtenerAnimes);
router.get("/banner", obtenerAnimeBanner);
router.get("/current-season", obtenerAnimeTemporadaActual);
router.get("/:id", obtenerAnimePorId);

export default router;