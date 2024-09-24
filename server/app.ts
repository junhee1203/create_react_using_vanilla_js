import express from 'express';
import type { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log(`Server is running http://localhost:3000/`);
});

