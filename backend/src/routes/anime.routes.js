import express from "express";
import { obtenerAnimes, obtenerAnimePorId, obtenerAnimeBanner } from "../controllers/anime.controller.js";

const router = express.Router();

router.get("/", obtenerAnimes);
router.get("/banner", obtenerAnimeBanner);
router.get("/:id", obtenerAnimePorId);

export default router;