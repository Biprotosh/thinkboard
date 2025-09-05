import {
    createFileRoute,
    useNavigate,
    useParams,
} from "@tanstack/react-router";
import NoteForm from "../../../components/NoteForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { type INote } from "../../../types/Note";
import toast from "react-hot-toast";

export const Route = createFileRoute("/update-note/$id/")({
    component: UpdateNote,
});

const fetchNote = async (id: string): Promise<INote> => {
    const res = await axios.get<INote>(`http://localhost:5001/api/notes/${id}`);
    return res.data;
};

const updateNote = async (note: INote): Promise<INote> => {
    const res = await axios.put<INote>(
        `http://localhost:5001/api/notes/${note._id}`,
        note
    );
    return res.data;
};

function UpdateNote() {
    const { id } = useParams({ from: "/update-note/$id/" });
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // fetch the current note
    const { data: note, isLoading } = useQuery({
        queryKey: ["api", "notes", id],
        queryFn: () => fetchNote(id),
    });

    const { mutate } = useMutation({
        mutationFn: updateNote,
        onSuccess: () => {
            // toast.success("Note updated successfully");
            // queryClient.invalidateQueries({ queryKey: ["api", "notes"] });
            // navigate({ to: "/" });
            toast.success("Note updated successfully");
            queryClient.invalidateQueries({queryKey: ["api", "notes"]});
            navigate({to: "/"});
        },
        onError: () => {
            toast.error("Failed to update the note");
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (!note) return <div>Note not found</div>;

    return (
        <NoteForm
            heading="Update Note"
            submitLabel="Save"
            defaultValues={note}
            onSubmit={(data) => mutate({ ...note, ...data })}
        />
    );
}
