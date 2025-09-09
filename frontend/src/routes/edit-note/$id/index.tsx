import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import toast from 'react-hot-toast';

import { fetchNoteById, updateNote } from '@/services/noteServices';
import NoteForm from '@/components/NoteForm';

export const Route = createFileRoute('/edit-note/$id/')({
	component: EditNotePage,
})

function EditNotePage() {

	const { id } = useParams({ from: "/edit-note/$id/" });
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	// fetch the current note
	const { data: note, isLoading } = useQuery({
		queryKey: ["api", "notes", id],
		queryFn: () => fetchNoteById(id),
	});

	const { mutate } = useMutation({
		mutationFn: updateNote,
		onSuccess: () => {
			toast.success("Note updated successfully");
			queryClient.invalidateQueries({ queryKey: ["api", "notes"] });
			navigate({ to: "/" });
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
			mutate={(data) => mutate({ ...note, ...data })}
		/>
	);
}
