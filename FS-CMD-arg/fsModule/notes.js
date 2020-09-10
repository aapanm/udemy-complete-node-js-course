const fs = require('fs');
const chalk =  require('chalk');

const addNote = (title, body) =>{
    const notes = loadNotes();   
    const duplicateNote = notes.find((notes)=> notes.title === title);
    
    debugger
    if(duplicateNote){
        return chalk.red.inverse('Duplicate Title!');
    }else{
        notes.push({
            title:title,
            body:body,
        });
        saveNotes(notes);
        return chalk.green.inverse('note saved!');
    }

    
}

const loadNotes=()=>{
    try{
        const data = JSON.parse(fs.readFileSync('notes.json').toString());
        return data;
    }catch(e){
        return []
    }
}

const saveNotes=(notesData)=>{
    const notesDataJson = JSON.stringify(notesData);
    fs.writeFileSync('notes.json', notesDataJson);
}

const removeNote=(title)=>{
    const notes = loadNotes();
    const filteredNotes = notes.filter((notes)=> notes.title !== title)
    saveNotes(filteredNotes);
    if(notes.length > filteredNotes.length){
        return chalk.green.inverse('removed note titled: '+title);
    }else{
        return chalk.red.inverse('No title found named: '+title);
    }
}

const listNodes=()=>{
    const notes = loadNotes();
    notes.forEach((note)=>{
       console.log(note.title);  
    })
}

const readNote = (title)=>{
    const notes = loadNotes();
    const note = notes.find((note)=> note.title === title);
    
    if(note){
        console.log(chalk.green.inverse(note.title));
        console.log(note.body);

    }else{
        console.log(chalk.red.inverse('No note found named: '+title));
    }
}

module.exports = {
    addNote : addNote,
    removeNote:removeNote,
    listNodes:listNodes,
    readNote:readNote
};