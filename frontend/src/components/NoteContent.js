import '../css/notes.css';
import React, { useState } from 'react';

export default function NoteContent({ note, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [isSaving, setIsSaving] = useState(false);
    const [showUpdatedAt, setShowUpdatedAt] = useState(false);
    const handleEdit = () => {
        setIsEditing(true);
        setShowUpdatedAt(true);
    };

    const handleCancel = () => {
        setTitle(note.title);
        setContent(note.content);
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            alert('Title and content cannot be empty');
            return;
        }
        setIsSaving(true);
        await onUpdate(note._id, { title, content });
        setIsSaving(false);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            onDelete(note._id);
        }
    };

    if (isEditing) {
        return (
            <div className="note-content editing">
                <input
                    type="text"
                    className="note-title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note title"
                />
                <hr />
                <textarea
                    className="note-content-input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Note content"
                    rows="6"
                />
                <div className="note-actions">
                    <button 
                        className="save-button" 
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button className="cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="note-content">
            <h2 className="note-title">{title}</h2>
            {
                showUpdatedAt && (
                    <small>Last Updated - {new Date(note.updatedAt).toLocaleDateString()} </small>
                )
            }
            <small>Created At - {new Date(note.createdAt).toLocaleDateString()}</small>
            <hr />
            <p className="note-body">{content}</p>
            <div className="note-actions">
                <button className="edit-button" onClick={handleEdit}>
                    Edit
                </button>
                <button className="delete-button" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}