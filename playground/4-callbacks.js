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


// const add =(a, b, callback)=>{
//     setTimeout(()=>{
//         console.log("after 2 secs!");
//         callback(a+b);
//     }, 2000);
// }

// add(1, 2, (sum)=>{
//     console.log(sum);
// });

// const doWorkCallback = (callback)=>{
//     setTimeout(()=>{
//         // callback('this is my error!', undefined);
//         callback(undefined, 'success!')
//     }, 2000);
// }

// doWorkCallback((error, result)=>{
//     if (error) {
//         return console.log(error);
//     }

//     console.log(result);
// })

// const array = [1,2,3];

// const sum = array.reduce((res, num)=>{
//         return num+res;
//     }, 0);

// console.log(sum);

const array = [
    {id: 1, name:'john', age:23},
    {id: 2, name:'Apon', age:21},
    {id: 1, name:'john', age:23}
]

const unique = Object.values(
    array.reduce((map, element)=>{
        if(!map[element.id]){
            map[element.id] = element;
        }
        return map;
    }, {})
);

console.log(unique);