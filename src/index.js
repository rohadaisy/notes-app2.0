import './styles/main.css';
import { 
  fetchNotes, 
  fetchArchivedNotes, 
  fetchNoteById, 
  addNote, 
  archiveNoteById, 
  unarchiveNoteById, 
  removeNoteById 
} from './api';
import { showLoading, hideLoading } from './loading';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

// Event Listener untuk memuat data setelah DOM siap
document.addEventListener('DOMContentLoaded', () => {
  const noteListContainer = document.getElementById('notes');
  const noteFormContainer = document.getElementById('noteFormContainer');

  if (noteListContainer && noteFormContainer) {
    NoteList(noteListContainer, handleDeleteNote, handleArchiveNote, handleUnarchiveNote);
    NoteForm(noteFormContainer, handleAddNote);

    renderNotes();
  }
});

// Render catatan
async function renderNotes() {
  showLoading();
  try {
    const notes = await fetchNotes();
    NoteList.render(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
  } finally {
    hideLoading();
  }
}

// Fungsi untuk menangani penambahan catatan baru
async function handleAddNote(title, body) {
  showLoading();
  try {
    const newNote = await addNote(title, body);
    renderNotes();
  } catch (error) {
    console.error('Error adding note:', error);
  } finally {
    hideLoading();
  }
}

// Fungsi untuk menangani penghapusan catatan
async function handleDeleteNote(id) {
  showLoading();
  try {
    await removeNoteById(id);
    renderNotes();
  } catch (error) {
    console.error('Error deleting note:', error);
  } finally {
    hideLoading();
  }
}

// Fungsi untuk mengarsipkan catatan
async function handleArchiveNote(id) {
  showLoading();
  try {
    await archiveNoteById(id);
    renderNotes();
  } catch (error) {
    console.error('Error archiving note:', error);
  } finally {
    hideLoading();
  }
}

// Fungsi untuk mengarsipkan kembali catatan
async function handleUnarchiveNote(id) {
  showLoading();
  try {
    await unarchiveNoteById(id);
    renderNotes();
  } catch (error) {
    console.error('Error unarchiving note:', error);
  } finally {
    hideLoading();
  }
}
