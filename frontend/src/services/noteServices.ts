import axios from "axios";
import type { TNote } from "@/types/Note";

export const createNote = async (note: TNote): Promise<TNote> => {
  const res = await axios.post<TNote>("http://localhost:5001/api/notes", note);
  return res.data;
};

export const updateNote = async (note: TNote): Promise<TNote> => {
    const res = await axios.put<TNote>(
        `http://localhost:5001/api/notes/${note._id}`,
        note
    );
    return res.data;
};

export const fetchNote = async (id: string): Promise<TNote> => {
    const res = await axios.get<TNote>(`http://localhost:5001/api/notes/${id}`);
    return res.data;
};

export const deleteNote = (id: string) => {
    return axios.delete(`http://localhost:5001/api/notes/${id}`);
};
