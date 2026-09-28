import express, { Application, Request, Response } from 'express';
import { logger } from './middlewares/logger';
import userRoutes from './routes/userRoutes';

const app: Application = express()

app.use(express.json());
app.use(logger);

app.get('/', (req: Request, res: Response) => {
  res.send('API is up and running! 🚀');
});

app.use('/api', userRoutes);

export default app;