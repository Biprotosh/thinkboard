import axios from "axios";
import type { TNote } from "@/types/Note";
import api from "@/lib/axios";

export const fetchNote = async (): Promise<Array<TNote>> => {
    const res = await api.get<Array<TNote>>(`/notes`);
    return res.data;
};

export const fetchNoteById = async (id: string): Promise<TNote> => {
    const res = await axios.get<TNote>(`/notes/${id}`);
    return res.data;
};

export const createNote = async (note: TNote): Promise<TNote> => {
  const res = await axios.post<TNote>("/notes", note);
  return res.data;
};

export const updateNote = async (note: TNote): Promise<TNote> => {
    const res = await axios.put<TNote>(
        `/notes/${note._id}`,
        note
    );
    return res.data;
};

export const deleteNote = async (id: string) => {
    return await axios.delete(`/notes/${id}`);
};
