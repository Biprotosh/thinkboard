import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import toast from 'react-hot-toast';

import NoteCard from '../components/NoteCard'
import type { INote } from '../types/Note';

export const Route = createFileRoute('/')({
    component: App,
})

function App() {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["api", "notes"],
        queryFn: () => {
            return axios.get("http://localhost:5001/api/notes");
        },
        staleTime: 30000, // 30000 ms 
        // refetchInterval: 1000 // it will refetch data every single second
    });

    if (isLoading) return <div>Page is loading...</div>;
    if (isError) return <div>{toast.error(error.message)}</div>;

    return (
        <>
            <section className='mt-3'>
                {data?.data?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.data?.map((note: INote) => (
                            <div key={note._id}>
                                <NoteCard {...note} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    )
}
