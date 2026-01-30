const API_BASE = process.env.REACT_APP_API_URL;

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  if (!response.ok) {
    if (contentType.includes('application/json')) {
      const err = await response.json();
      throw new Error(err.message || JSON.stringify(err));
    } else {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }
  }
  if (contentType.includes('application/json')) return response.json();
  return response.text();
}

export const getNotes = async (token) => {
  const response = await fetch(`${API_BASE}/api/notes`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return parseResponse(response);
};

export const createNote = async (note, token) => {
  const response = await fetch(`${API_BASE}/api/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  });
  return parseResponse(response);
};

export const updateNote = async (id, note, token) => {
  const response = await fetch(`${API_BASE}/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  });
  return parseResponse(response);
};

export const deleteNote = async (id, token) => {
  const response = await fetch(`${API_BASE}/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return parseResponse(response);
};