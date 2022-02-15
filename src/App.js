import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';


const App = () => {

  const[notes,setNotes] = useState([
  {
    id: nanoid(),
    text: "This is my first note",
    date:"1.2.2022.",
  },
  {
    id: nanoid(),
    text: "This is my second note",
    date:"12.2.2022.",
  },
  {
    id: nanoid(),
    text: "This is my third note",
    date:"13.2.2022.",
  },
]);

const [searchText, setSearchText] = useState('');

useEffect(() =>{
  const savedNotes = JSON.parse(localStorage.getItem('react-erin-data'));
  if(savedNotes){
    setNotes(savedNotes);
  }
  
}, [])

useEffect(() => {
  localStorage.setItem(
    'react-erin-data',
    JSON.stringify(notes)
    );
}, [notes])

const addNote = (text) =>{
  const date = new Date();
  const newNote = {
    id: nanoid(),
    text: text,
    date: date.toLocaleDateString(),
  }
  const newNotes = [...notes, newNote];
  setNotes(newNotes);
};

const deleteNote = (id) => {
  const newNotes = notes.filter((note) => note.id !== id);
  setNotes(newNotes);
}

  return (
  <div className='container'>
    <Header />
    <Search handleSearchNote={setSearchText}/>
    <NotesList 
      notes={notes.filter((note)=>
        note.text.toLowerCase().includes(searchText)
        )} 
      handleAddNote={addNote}
      handleDeleteNote={deleteNote}
      ></NotesList>
  </div>
  );
};

export default App;