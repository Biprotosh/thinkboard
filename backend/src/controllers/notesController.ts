import type { Request, Response } from "express";
import Note, { type INote } from "../models/Note.ts";

type TNoteResponse = INote[] | INote | {message: string};

export const getAllNotes = async (_: Request, res: Response<TNoteResponse>) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getAllNotes ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getNoteByID = async (req: Request<{id: string}>, res: Response<TNoteResponse>) => {
    try {
        const id = req.params.id
        const note: INote|null = await Note.findById(id);
        
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(note);
    } catch (error) {
        console.log("Error in getNoteByID ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createNote = async (req: Request<{}, {}, INote>, res: Response<TNoteResponse>) => {
    try {   
        const {title, description} = req.body;

        const note = new Note({title, description});
        const savedNote = await note.save();

        res.status(200).json(savedNote);
    } catch (error) {
        console.log("Error in createNote ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateNote = async (req: Request<{id: string}, {}, INote>, res: Response<TNoteResponse>) => {
    try {
        const {title, description} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, description}, {new: true});
        if(!updatedNote) return res.status(404).json({message: "Note not found"});
        return res.status(200).json({message: "Note updated successfully"});
    } catch (error) {
        console.log("Error in updateNote ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteNote = async (req: Request<{id: string}>, res: Response<TNoteResponse>) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message: "Note not found"});
        return res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.log("Error in deleteNote ", error);
        res.status(500).json({message: "Internal server error"});
    }
}