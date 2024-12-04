import { Router } from "express";
import { getCards, getOneCards, UpdateStatusCard } from "../controllers/cards.controllers.js";

const router = Router()

router.get('/cards', getCards)

router.get('/cards/:id', getOneCards)

router.put('/cards/:id', UpdateStatusCard)


export default router;