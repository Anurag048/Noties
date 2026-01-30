const API_BASE = process.env.REACT_APP_API_URL;

export const getNotes = async (token) =>{
    const response = await fetch(`${API_BASE}/notes`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

const createNote =  async (note, token) =>{
    const response = await fetch(`${API_BASE}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(note)
    });
    return response.json();
}

const updateNote = async (id, note, token) =>{
    const response = await fetch(`${API_BASE}/notes/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(note)
    });
    return response.json();
}

const deleteNote = async (id, token) =>{
    const response = await fetch(`${API_BASE}/notes/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

export { createNote, updateNote, deleteNote };