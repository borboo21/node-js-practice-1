const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname,'db.json');

async function addNote(title) {
    const notes = await getNotes();
    console.log(notes)
    const note = {
        title,
        id: Date.now().toString(),
    }
    notes.push(note)

    await fs.writeFile(notesPath,JSON.stringify(notes))
    console.log(chalk.green.inverse('Note was added:'))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath,{encoding:'utf8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes(){
    const notes = await getNotes()

    console.log(chalk.bgBlue('Here is the list of notes'));
    notes.forEach(note => {
        console.log(chalk.green(note.id),chalk.blue(note.title));
    })
}

async function removeNote(id) {
    const notes = await getNotes();
    const stringId = id.toString();
    const updatedNotes = notes.filter(note => note.id !== stringId )
    await fs.writeFile(notesPath,JSON.stringify(updatedNotes));
    console.log(chalk.bgMagentaBright('Note was removed'));
}

async function editNote(id,newTitle) {
    console.log(newTitle)
    const notes = await getNotes();
    const stringId = id.toString();
    const noteFind = notes.find(note => note.id === stringId);
    noteFind.title = newTitle;
    await fs.writeFile(notesPath,JSON.stringify(notes));
    console.log(chalk.blue('Note was edited'));
}

module.exports = {
    addNote,printNotes,removeNote,getNotes,editNote
}