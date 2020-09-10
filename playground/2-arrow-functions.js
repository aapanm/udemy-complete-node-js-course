// const square = function(x){
//     return (x*x);
// }

// const square = (x) =>{
//     return (x*x);
// }

// const square = (x) => x * x;

// console.log(square(3));

const event = {
    name:'Birthday party',
    guetsList:['Andrew', 'jen', 'mike'],
    printGuestList(){
        console.log('Guest List for: '+this.name);
        this.guetsList.forEach((guest)=>{
            console.log(guest+' is attending '+ this.name);
        })
    }
}

event.printGuestList();