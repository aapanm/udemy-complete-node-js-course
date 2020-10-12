const validator = require('validator');
const mongoose  = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Tasks = require('./tasks');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('invalid email');
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length < 7) throw new Error("Too short password!");
            if(value.toLowerCase().includes("password")) throw new Error("please provide another password!");
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value < 0) throw new Error('Age must be a positive number!');
        },
    },
    tokens:[{
        token:{
            type: String,
            require:true
        }
    }]

}, {
    timestamps:true
});

userSchema.virtual('tasks', {
    ref:'Tasks',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.generateAuthToken = async function () {
    
    const user = this;
    const token = jwt.sign( { _id: user._id.toString() }, 'thisisjsontoken');
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}

userSchema.methods.getPublicProfile = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    
    return userObject;
}


userSchema.statics.findUserByCredentials = async (email, password) =>{
    
    const user = await User.findOne({email});

    if(!user) throw new Error('Unable to login!');

    const isMatch = await bcryptjs.compare(password, user.password);

    if(!isMatch) throw new Error('Unable to login!');

    return user;

}

//hashing password
userSchema.pre('save', async function (next) {
    
    const user = this;

    if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password, 8);
    }

    next();
})

//deleting tasks with users removal
userSchema.pre('remove', async function (next) {
    
    const user = this;

    console.log(user);
    await Tasks.deleteMany({owner:user._id});

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User