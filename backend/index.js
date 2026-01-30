import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRoutes from './routes/AuthRoutes.js';
import NotesRoutes from './routes/NotesRoutes.js';

// Dynamically import db.js to ensure dotenv is loaded first
await import('./models/db.js');  

const app = express();
const { json } = bodyParser;

app.use(json());
app.use(cors({
  origin: 'https://noties-ten.vercel.app',
  credentials: true
}));
app.use('/auth', AuthRoutes);
app.use('/api', NotesRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});