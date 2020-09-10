const chalk =  require('chalk');
const getNote = require('./fsModule/notes');
const yargs = require('yargs');
const notes = require('./fsModule/notes');
const command = process.argv[2];

//customize yargs
yargs.version('1.1.0');

//add, remove, read, list

//create add command
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder:{
        title:{
            describe:'Note title',
            demandOption: false,
            type:'string'
        },
        body:{
            describe:'Note Body',
            demandOption:true,
            type:'string',
        }
    },
    handler(argv){
        console.log(chalk.blue.inverse('Adding new note titled: '+chalk.green.inverse(argv.title)));
        const addNoteResponse = notes.addNote(argv.title, argv.body);
        console.log((addNoteResponse));
    }
})

//create remove command
yargs.command({
    command:'remove',
    describe:'remove new note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        console.log(chalk.blue.inverse('Removing the note titled: '+chalk.green.inverse(argv.title)));
        const removeNoteResponse = notes.removeNote(argv.title);
        console.log((removeNoteResponse));
    }
})

//create list command
yargs.command({
    command:'list',
    describe:'listing notes',
    builder:{
        title:{
            describe:'note titles',
            demandOption:false,
            type:'array',  
        }
    },
    handler(argv){
        console.log(chalk.red.inverse('Listing all notes:'));
        const noteList = notes.listNodes();
    }
})

//create reading command
yargs.command({
    command:'read',
    describe:'reading the note',
    builder:{
        title:{
            describe:'note titles',
            demandOption:true,
            type:'string', 
        }
    },
    handler(argv){
        console.log(chalk.red.inverse('Reading the note titled: '+chalk.green.inverse(argv.title)));
        notes.readNote(argv.title);
    }
})

yargs.parse();