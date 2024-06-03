const noteListContainer = document.getElementById('note-list-container');
const loadingContainer = document.getElementById('loading-container');
let isLoading = false;

const fetchNotes = async () => {
    try {
      isLoading = true; // Set isLoading ke true saat request dimulai
      updateLoadingIndicator();
  
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
      const data = await response.json();
  
      isLoading = false; // Set isLoading ke false setelah request selesai
      updateLoadingIndicator();
  
      return data.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      isLoading = false; // Pastikan isLoading diatur kembali ke false jika terjadi kesalahan
      updateLoadingIndicator();
      return [];
    }
  };

  const updateLoadingIndicator = () => {
    if (isLoading) {
      loadingContainer.innerHTML = LoadingIndicator(); // Tampilkan indikator loading
    } else {
      loadingContainer.innerHTML = ''; // Sembunyikan indikator loading jika tidak sedang loading
    }
  };
  
  const renderNotes = (notes) => {
    noteListContainer.innerHTML = ''; // Kosongkan kontainer sebelum menambahkan catatan
  
    notes.forEach((note) => {
      const noteElement = document.createElement('div');
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <button onclick="handleDeleteNote('${note.id}')">Delete</button>
        <button onclick="handleArchiveNote('${note.id}')">Archive</button>
      `;
      noteListContainer.appendChild(noteElement);
    });
  };

const deleteNote = async (noteId) => {
  try {
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};

const archiveNote = async (noteId) => {
  try {
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}/archive`, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error archiving note:', error);
  }
};

const unarchiveNote = async (noteId) => {
  try {
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}/unarchive`, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error unarchiving note:', error);
  }
};


const handleDeleteNote = async (noteId) => {
  const result = await deleteNote(noteId);
  if (result.status === 'success') {
    const updatedNotes = await fetchNotes();
    renderNotes(updatedNotes);
  }
};

const handleArchiveNote = async (noteId) => {
  const result = await archiveNote(noteId);
  if (result.status === 'success') {
    const updatedNotes = await fetchNotes();
    renderNotes(updatedNotes);
  }
};

const init = async () => {
  const notes = await fetchNotes();
  renderNotes(notes);
};

init();
