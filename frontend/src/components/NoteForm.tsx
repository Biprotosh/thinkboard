import { useForm } from '@tanstack/react-form';

import type { TNote } from '@/types/Note';
import { noteSchema, type TNoteInput } from '@/schemas/noteSchema';

type NoteFormProps = {
    defaultValues?: TNote;
    mutate: (data: TNote) => void;
    heading: string;
    submitLabel: string;
};

const NoteForm = ({ defaultValues, mutate, heading, submitLabel }: NoteFormProps) => {

    const form = useForm({
        defaultValues: defaultValues ? defaultValues : {
            title: "",
            description: "",
        } as TNoteInput,
        onSubmit: ({ value }) => {
            mutate(value);
            // console.log(value)
        }
        
    });

    return (
        <div className="w-full max-w-md p-6 mx-auto mt-10 bg-gradient-to-t to-[#ffd19c] from-[#f0f0f0] rounded-2xl shadow-lg">
            <header className="mb-4 text-center">
                <h3 className="text-2xl font-bold text-gray-800">{heading}</h3>
            </header>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
                className="space-y-5"
            >
                <form.Field
                    name='title'
                    validators={{
                        onChange: ({ value }) => {
                            const { success, error } = noteSchema.shape.title.safeParse(value);
                            return success ? undefined :error.errors[0].message; 
                        }
                    }}
                    children={(field) => (
                        <div>
                            <input
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="Enter note title"
                                className="bg-white w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f79c33] focus:border-transparent"
                            />
                            {field.state.meta.errors?.[0] && (
                                <p className="text-red-500 text-sm ml-1">{field.state.meta.errors[0]}</p>
                            )}
                        </div>
                    )}
                />

                <form.Field
                    name='description'
                    validators={{
                        onChange: ({ value }) => {
                            const { success, error } = noteSchema.shape.description.safeParse(value);
                            return success ? undefined : error.errors[0].message;
                        }
                    }}
                    children={(field) => (
                        <div>
                            <textarea
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                rows={4}
                                placeholder="Enter note description"
                                className="bg-white w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#f79c33] focus:border-transparent"
                            />
                            {field.state.meta.errors?.[0] && (
                                <p className="text-red-500 text-sm ml-1">{field.state.meta.errors[0]}</p>
                            )}
                        </div>
                    )}
                />

                <footer className="flex justify-end">
                    <button
                        type="submit"
                        className="px-5 py-2 text-white font-medium bg-[#f79c33] rounded-lg shadow-md hover:bg-[#e0892c] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#f79c33] transition"
                    >
                        {submitLabel}
                    </button>
                </footer>
            </form>
        </div>

    );
};

export default NoteForm;