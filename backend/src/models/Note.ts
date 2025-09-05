import mongoose, { Document, Model, Schema } from "mongoose";

// 1. create a schema
// 2. create a model based off of the schema

export interface INote extends Document {
  _id: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const noteSchema: Schema<INote> = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
}, { timestamps: true }); // timestamps will give me createdAt, updatedAt fields

const Note:Model<INote> = mongoose.model('Note', noteSchema);

export default Note;