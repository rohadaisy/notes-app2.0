const API_BASE_URL = 'https://notes-api.dicoding.dev/v2';

// Fetch all non-archived notes
async function fetchNotes() {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  const data = await response.json();
  return data.data;
}

// Fetch all archived notes
async function fetchArchivedNotes() {
  const response = await fetch(`${API_BASE_URL}/notes/archived`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch archived notes');
  }
  const data = await response.json();
  return data.data;
}

// Fetch a single note by ID
async function fetchNoteById(noteId) {
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch note');
  }
  const data = await response.json();
  return data.data;
}

// Add a new note
async function addNote(title, body) {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  });
  if (!response.ok) {
    throw new Error('Failed to add note');
  }
  const data = await response.json();
  return data.data;
}

// Archive a note by ID
async function archiveNoteById(noteId) {
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}/archive`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to archive note');
  }
}

// Unarchive a note by ID
async function unarchiveNoteById(noteId) {
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}/unarchive`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to unarchive note');
  }
}

// Delete a note by ID
async function removeNoteById(noteId) {
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
}

export { 
  fetchNotes, 
  fetchArchivedNotes, 
  fetchNoteById, 
  addNote, 
  archiveNoteById, 
  unarchiveNoteById, 
  removeNoteById 
};
