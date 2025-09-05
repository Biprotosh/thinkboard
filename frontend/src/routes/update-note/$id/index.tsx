import {
    createFileRoute,
    useNavigate,
    useParams,
} from "@tanstack/react-router";
import NoteForm from "../../../components/NoteForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchNote, updateNote } from "../../../services/noteServices";

export const Route = createFileRoute("/update-note/$id/")({
    component: UpdateNote,
});

function UpdateNote() {
    const {id} = useParams({from: "/note-details/$id/"});
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
            onSubmit={(data) => mutate({...note, ...data})}
        />
    );
}
