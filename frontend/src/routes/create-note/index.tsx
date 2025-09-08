import NoteForm from '@/components/NoteForm';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/create-note/')({
  component: CreateNote,
})

function CreateNote() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // const {mutate} = useMutation({
  //   mutationFn: createNote,
  //   onSuccess: () => {
  //     toast.success("Note created successfully!");
  //     // invalidate or refetch notes list
  //     queryClient.invalidateQueries({ queryKey: ["api", "notes"] });

  //     // queryClient.setQueryData(["api", "notes"], (oldQueryData) => {
  //     //   return {
  //     //     ...oldQueryData,
  //     //     data: [...oldQueryData.data, newData.data]
  //     //   }
  //     // })
  //     navigate({to:"/"});
  //   },
  //   onError: () => {
  //     toast.error("Failed to create note");
  //   }
  // });

   return (
    <NoteForm
      heading="Create Note"
      submitLabel="Save Note"
      onSubmit={() => {}}
    />
  );
}
