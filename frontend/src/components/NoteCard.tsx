import { Link, useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { TNote } from '@/types/Note';
import { deleteNote } from "@/services/noteServices";
import type React from "react";

const NoteCard = ({ title, description, createdAt, _id }: TNote) => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            toast.success("Note deleted successfully!");
            // invalidate or refetch notes list
            queryClient.invalidateQueries({ queryKey: ["api", "notes"] });
        },
        onError: () => {
            toast.error("Failed to delete the note");
        }
    });

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (_id === undefined)
            return toast.error("Note not found");
        mutate(_id);
    };

    return (
        <div className="w-full bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition">
            <h2 className="text-lg font-semibold text-orange-500 mb-2 line-clamp-1">
                {title}
            </h2>
            <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                {description}
            </p>
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                    {createdAt ? new Date(createdAt).toLocaleDateString() : "Unknown Date"}
                </span>
                <div className="flex gap-2">
                    <Link to="/edit-note/$id" params={{ id: `${_id}` }}>
                        <button className="px-3 py-1 text-sm rounded-lg bg-orange-400 text-white hover:bg-orange-500 transition shadow">
                            Update
                        </button>
                    </Link>
                    <button className="px-3 py-1 text-sm rounded-lg bg-red-400 text-white hover:bg-red-500 transition shadow" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>

    );
};

export default NoteCard;