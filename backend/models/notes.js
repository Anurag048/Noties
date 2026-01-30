import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const noteSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true, 
    },
    content:{
        type: String,
        required: true,
        trim: true,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const noteModel = model('Note' , noteSchema);
export default noteModel;