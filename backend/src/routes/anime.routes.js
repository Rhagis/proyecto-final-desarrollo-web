import express from "express";
import { obtenerAnimes } from "../controllers/anime.controller.js";

const router = express.Router();

router.get("/", obtenerAnimes);

export default router;