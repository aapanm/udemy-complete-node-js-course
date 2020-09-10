const fs = require('fs');
// const book = {
//     title:'Ego is the enemy',
//     author:'Ryan Holiday'
// }

// const bookJson = JSON.stringify(book);
// console.log(bookJson);

// const bookJsonParse = JSON.parse(bookJson);
// console.log(bookJsonParse.author);

// fs.writeFileSync('1-Json.json', bookJson);

const data = JSON.parse(fs.readFileSync('1-Json.json').toString());
data.name = 'aapan';
data.age = '27';
fs.writeFileSync('1-Json.json', JSON.stringify(data));