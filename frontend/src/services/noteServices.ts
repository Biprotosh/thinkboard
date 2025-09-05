import axios from "axios";
import type { INote } from "../types/Note";

export const createNote = async (note: INote): Promise<INote> => {
  const res = await axios.post<INote>("http://localhost:5001/api/notes", note);
  return res.data;
};

export const updateNote = async (note: INote): Promise<INote> => {
    const res = await axios.put<INote>(
        `http://localhost:5001/api/notes/${note._id}`,
        note
    );
    return res.data;
};

export const fetchNote = async (id: string): Promise<INote> => {
    const res = await axios.get<INote>(`http://localhost:5001/api/notes/${id}`);
    return res.data;
};

export const deleteNote = (id: string) => {
    return axios.delete(`http://localhost:5001/api/notes/${id}`);
};
