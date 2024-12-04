import express from 'express';
import cardsRouter from './routes/cards.routes.js';  

const app = express();

app.use(express.json())
app.use('/api',cardsRouter)

export default app;