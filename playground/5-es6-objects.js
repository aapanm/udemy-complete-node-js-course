//obejct property shorthand

const name ='aapan';
const userAge = 27;

const user = {
    name,
    age:userAge,
    location:"chittagong"
}

console.log(user);

//object destructuring

const product = {
    label:'red notebook',
    price:3,
    stock:201,
    salePrice: undefined
}

const transaction = (type, {label="none", stock=0}={})=>{
    console.log(type, label, stock);
}

transaction("Order");

