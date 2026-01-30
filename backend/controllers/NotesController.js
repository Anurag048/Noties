import noteModel from '../models/notes.js';
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id; // Get userId from authenticated token
        const newNote = new noteModel({ title, content, userId});
        await newNote.save();
        res.status(201).json({data: newNote, message: 'Note created successfully', success:true});
    
    }catch (error){
        res.status(500).json({message: error.message,success:false});
    }
}

const getNotes = async (req,res) =>{
    try {
        const userId = req.user.id; // Get userId from authenticated token
        const notes = await noteModel.find({userId}); // Filter notes by logged-in user
        res.status(200).json({data: notes, message: 'Notes fetched successfully', success:true});
    } catch (error) {
        res.status(500).json({message: error.message,success:false});
    }
}

const updateNote = async (req,res) =>{
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user.id; // Get userId from authenticated token
        const updatedNote = await noteModel.findByIdAndUpdate(
            id,
            { title, content, userId },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found', success: false });
        }
        res.status(200).json({ data: updatedNote, message: 'Note updated successfully', success: true });
    } catch (error) {
        res.status(500).json({message: error.message,success:false});
    }
}

const deleteNote = async (req,res) =>{
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const deleteNote = await noteModel.findOneAndDelete({ _id: id, userId });
        if (!deleteNote) {
            return res.status(404).json({ message: 'Note not found or unauthorized', success: false });
        }
        res.status(200).json({ data: deleteNote, message: 'Note deleted successfully', success: true });
    } catch (error) {
        res.status(500).json({message: error.message,success:false});
    }
}

export default {
    createNote,
    getNotes,
    updateNote,
    deleteNote
}