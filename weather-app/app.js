const geocode = require('./apis/geocode');
const forecast = require('./apis/forecast');
const yargs = require('yargs');


//const address = process.argv[2]; **another way to get command argument without yargs!!

yargs.command({
    command:'location',
    describe:'Put a location!',
    builder:{
        name:{
            describe:'location',
            demandOption: true,
            type:'string'
        }
    },
    handler({name}){
        geocode(name, (geoResponse, code)=>{
            if(code){
                const {lat, lon, location} = geoResponse;
                forecastData = forecast(lat, lon, (response, code)=>{
                    if(code){
                        console.log('location:'+location);
                        console.log(response);
                    }else{
                        console.log(response);
                    }
                })
            }else{
                console.log(geoResponse);
            }
        })
    }
})

yargs.parse();





