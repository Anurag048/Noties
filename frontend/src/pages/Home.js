import React from 'react';
import '../css/home.css';
import { useNavigate } from 'react-router-dom';
import { createNote } from '../services/noteService.js';

export default function Home(){
    const [username, setUsername] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [isCreating, setIsCreating] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const navigate = useNavigate();

    React.useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);
    }, []);

    const handleLogout = (e) =>{
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate('/login'); 
    }

    const handleAddNote = async (e) => {
        e.preventDefault();
        
        if (!title.trim() || !content.trim()) {
            setMessage('Title and content cannot be empty');
            return;
        }

        try {
            setIsCreating(true);
            const token = localStorage.getItem('token');
            const response = await createNote({ title, content }, token);
            
            if (response.success) {
                setMessage('Note created successfully!');
                setTitle("");
                setContent("");
                setTimeout(() => {
                    setMessage("");
                    navigate('/notes');
                }, 1500);
            } else {
                setMessage(response.message || 'Failed to create note');
            }
        } catch (error) {
            setMessage('Error creating note: ' + error.message);
        } finally {
            setIsCreating(false);
        }
    }

    return(
        <div className='main'>
            <nav>
                <h1>Welcome to Noties!</h1>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <div className='context-container'>
            <div className='section-container'>
            <section>
                <h2>Notes App</h2>
                <h3>Welcome back, {username ? username[0].toUpperCase() + username.slice(1) : 'User'}!</h3>
            </section>
            <button onClick={() => navigate('/notes')}>View Notes</button>
            </div>
            <div className='add-note'>
                <form onSubmit={handleAddNote}>
                <input 
                type='text' 
                placeholder='Add title to your note'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <textarea 
                placeholder='Add content to your note'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type='submit' disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Add Note'}
                </button>
                {message && (
                    <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
                </form>
                
            </div>
            
            </div>
        </div>
    )
}