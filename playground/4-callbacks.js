// setTimeout(()=>{
//     console.log('Two secs are up!');
// }, 2000);

// const names = ['aapan', 'mutusddy'];

// const shortNames = names.filter((n)=>{
//     return n.length<6;
// })

// const geocode = (address, callback) =>{
//     setTimeout(()=>{
//         const data = {
//             lat:0,
//             lon:0
//         }
//         callback(data);
//     }, 2000);
// }

// geocode('Dhaka', (data)=>{
//     console.log(data);
// })

// const add =(a,b,callback)=>{
//     setTimeout(()=>{
//         callback(a+b);
//     }, 2000);
// }

// add(1, 4, (sum) => {
//     console.log(sum) // Should print: 5
// })

const doWorkCallback = (callback)=>{
    setTimeout(()=>{
        // callback('this is my error!', undefined);
        callback(undefined, 'success!')
    }, 2000);
}

doWorkCallback((error, result)=>{
    if (error) {
        return console.log(error);
    }

    console.log(result);
})