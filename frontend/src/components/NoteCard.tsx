// import { Link } from "@tanstack/react-router";
import type { INote } from "../types/Note";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { deleteNote } from "../services/noteServices";

const NoteCard = ({ title, description, createdAt }: INote) => {

    // const queryClient = useQueryClient();
    // const { mutate } = useMutation({
    //     mutationFn: deleteNote,
    //     onSuccess: () => {
    //         toast.success("Note deleted successfully!");
    //         // invalidate or refetch notes list
    //         queryClient.invalidateQueries({ queryKey: ["api", "notes"] });
    //     },
    //     onError: () => {
    //         toast.error("Failed to delete the note");
    //     }
    // });

    // const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     if(_id === undefined)
    //         return toast.error("Note not found");
    //     mutate(_id);
    // };

    return (
        // <Link to="/note-details/$id" params={{ id: `${_id}` }}>
            <div className=" w-full bg-white shadow-lg rounded-xl p-5 border border-gray-100">
                {/* Title */}
                <h2 className="text-xl font-semibold text-orange-500 mb-2">
                    {title}
                </h2>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4">
                    {description}
                </p>

                {/* Footer Section */}
                <div className="flex items-center justify-between">
                    {/* Date */}
                    <span className="text-xs text-gray-400">{createdAt ? new Date(createdAt).toLocaleDateString() : "Unknown Date"}</span>

                    {/* Actions */}
                    <div className="flex gap-2">
                        {/* <button className="px-3 py-1 text-sm rounded-lg bg-orange-400 text-white hover:bg-orange-500 transition" >
                            Update
                        </button> */}
                        <button className="px-3 py-1 text-sm rounded-lg bg-red-400 text-white hover:bg-red-500 transition" >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        // </Link>
    );
};

export default NoteCard;