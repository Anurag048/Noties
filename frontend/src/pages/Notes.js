import React, { useCallback, useEffect, useState } from "react";
import "../css/notes.css";
import { useNavigate } from "react-router-dom";
import NoteContent from "../components/NoteContent.js";
import { getNotes, createNote, updateNote, deleteNote } from "../services/noteService.js";
import {ToastContainer} from 'react-toastify';
import { showErrorToast} from '../UItils';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Fetch notes on component mount
    

    const fetchNotes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getNotes(token);
            if (response.success) {
                setNotes(response.data);
            } else {
                showErrorToast(response.message || 'Failed to fetch notes');
            }
        } catch (err) {
            showErrorToast('Error fetching notes: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
         fetchNotes();
    }, [fetchNotes]);

    const handleCreateNote = async () => {
        if (!newTitle.trim() || !newContent.trim()) {
            showErrorToast('Title and content cannot be empty');
            return;
        }
        try {
            const response = await createNote({ title: newTitle, content: newContent }, token);
            if (response.success) {
                setNotes([response.data, ...notes]);
                setNewTitle("");
                setNewContent("");
                setIsCreating(false);
            } else {
                showErrorToast(response.message || 'Failed to create note');
            }
        } catch (err) {
            showErrorToast('Error creating note: ' + err.message);
        }
    };

    const handleUpdateNote = async (id, updatedData) => {
        try {
            const response = await updateNote(id, updatedData, token);
            if (response.success) {
                setNotes(notes.map(note => note._id === id ? response.data : note));
            } else {
                showErrorToast(response.message || 'Failed to update note');
            }
        } catch (err) {
            showErrorToast('Error updating note: ' + err.message);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            const response = await deleteNote(id, token);
            if (response.success) {
                setNotes(notes.filter(note => note._id !== id));
            } else {
                showErrorToast(response.message || 'Failed to delete note');
            }
        } catch (err) {
            showErrorToast('Error deleting note: ' + err.message);
        }
    };

    if (loading) return <div className="notes-container"><h2>Loading notes...</h2></div>;
    if (error) return <div className="notes-container"><h2 style={{ color: 'red' }}>{error}</h2></div>;

    return (
        <div className="notes-container">
            <div className="notes-header">
                <h1>My Notes</h1>
                <div className="group-buttons">
                <button className="create-note-btn" onClick={() => navigate('/home')}>Home</button>
                
                </div>
            </div>

            {isCreating && (
                <div className="note-content editing">
                    <input
                        type="text"
                        className="note-title-input"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Note title"
                    />
                    <hr />
                    <textarea
                        className="note-content-input"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Note content"
                        rows="6"
                    />
                    <div className="note-actions">
                        <button className="save-button" onClick={handleCreateNote}>
                            Create Note
                        </button>
                        <button className="cancel-button" onClick={() => {
                            setIsCreating(false);
                            setNewTitle("");
                            setNewContent("");
                        }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="notes-content">
                {notes.length === 0 ? (
                    <p>No notes yet. Create your first note!</p>
                ) : (
                    notes.map(note => (
                        <NoteContent 
                            key={note._id} 
                            note={note}
                            onUpdate={handleUpdateNote}
                            onDelete={handleDeleteNote}
                        />
                    ))
                )}
            </div>
            <ToastContainer />
        </div>
    );
}