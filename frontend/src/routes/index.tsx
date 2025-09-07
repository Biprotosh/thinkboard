import NoteCard from '@/components/NoteCard'
import type { INote } from '@/types/Note';
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/')({
    component: App,
})

function App() {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get("http://localhost:5001/api/notes");
                // console.log(res.data);
                setNotes(res.data);
            } catch (error) {
                console.log('Error fetching data');
                toast.error("Failed to load notes");
            } finally {
                setLoading(false);
            }
        }
        fetchNotes();
    }, [])

    return (
        <>
            <section className='mt-3'>
                {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
                {notes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note: INote) => (
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
