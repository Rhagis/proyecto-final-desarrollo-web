import express from "express";
import { obtenerAnimes, obtenerAnimePorId } from "../controllers/anime.controller.js";

const router = express.Router();

router.get("/", obtenerAnimes);
router.get("/:id", obtenerAnimePorId);

export default router;