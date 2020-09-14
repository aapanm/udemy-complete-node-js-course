const doWorkPromise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        // resolve([1,2,3]);
        reject('things went wrong!')
    }, 2000)
});

doWorkPromise.then((result)=>{
    console.log('Sucesss!', result);
}).catch((error)=>{
    console.log('Error', error)
})
