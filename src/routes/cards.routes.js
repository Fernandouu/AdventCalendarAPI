import { Router } from "express";
import { getCards, getOneCards, UpdateStatusCard, OpenCard } from "../controllers/cards.controllers.js";

const router = Router()

router.get('/cards', getCards)

router.get('/cards/:id', getOneCards)

router.put('/Updatecards/:id', UpdateStatusCard)

router.patch('/cards/:id/open', OpenCard)


export default router;