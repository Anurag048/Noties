import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        trim: true, 
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
}, {timestamps: true});

const userModel = model('User', userSchema);
export default userModel;