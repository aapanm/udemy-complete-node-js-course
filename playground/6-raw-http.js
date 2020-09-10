const https = require('https');
const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=40&lon=-75&appid=2d1d451304f3c0baf4dfaaafd180eb42';


const request = https.request(url, (response)=>{

    let data = '';

    response.on('data', (chunk)=>{
        data = data + chunk.toString();
    })

    response.on('end', ()=>{
        const parsedData = JSON.parse(data);
        console.log(parsedData.daily[0]);
    })
})

request.on('error', (error)=>{
    console.log('An error', error);
})

request.end();