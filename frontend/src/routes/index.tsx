import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import toast from 'react-hot-toast';

import NoteCard from '@/components/NoteCard'
import { fetchNote } from '@/services/noteServices';

export const Route = createFileRoute('/')({
    component: App,
})

function App() {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["api", "notes"],
        queryFn: fetchNote,
        staleTime: 30000, // 30000 ms 
        // refetchInterval: 1000 // it will refetch data every single second
    });

    if (isLoading) return <div>Page is loading...</div>;
    if (isError) return <div>{toast.error(error.message)}</div>;

    return (
        <>
            <section className='mt-3'>
                {data?.length ? (
                    <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map(note => (
                            <NoteCard key={note._id} {...note} />
                        ))}
                    </section>
                ) : (
                    <p>No notes found</p>
                )}
            </section>
        </>
    )
}
