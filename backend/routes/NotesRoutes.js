import express from 'express';
import NotesController from '../controllers/NotesController.js';
import verifyToken from '../middlewares/AuthMiddleware.js';

const router = express.Router();
const { createNote, getNotes, updateNote, deleteNote } = NotesController;

// All routes are protected with verifyToken middleware
router.get('/notes', verifyToken, getNotes);
router.post('/notes', verifyToken, createNote);
router.put('/notes/:id', verifyToken, updateNote);
router.delete('/notes/:id', verifyToken, deleteNote);

export default router;
