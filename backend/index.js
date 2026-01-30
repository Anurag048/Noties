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

// Frontend origin - set via env var in Render (e.g. FRONTEND_URL=https://your-vercel-app.vercel.app)
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://noties-ten.vercel.app';

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  // Explicitly allow Authorization header for Bearer token
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Helpful debug log (only in non-production) to troubleshoot missing Authorization header issues
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('req.headers.authorization:', req.headers.authorization);
  }
  next();
});

app.use('/auth', AuthRoutes);
app.use('/api', NotesRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});