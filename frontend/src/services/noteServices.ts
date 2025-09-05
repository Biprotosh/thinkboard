import axios from "axios";
import type { INote } from "../types/Note";

export const createNote = async (note: INote): Promise<INote> => {
  const res = await axios.post<INote>("http://localhost:5001/api/notes", note);
  return res.data;
};