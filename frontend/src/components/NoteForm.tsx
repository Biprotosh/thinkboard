import { Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea } from '@heroui/react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import type { INote } from '../types/Note';

type NoteFormProps = {
  defaultValues?: Partial<INote>;     // for edit mode
  onSubmit: (data: INote) => void;    // create or update
  heading: string;                    // card title
  submitLabel: string;                // button label
};

const NoteForm = ({ defaultValues, onSubmit, heading, submitLabel }: NoteFormProps) => {

  const { register, handleSubmit, formState: { errors } } = useForm<INote>({
    defaultValues,
  });

  const submitHandler: SubmitHandler<INote> = (data) => {
    if (!data.title.trim() || !data.description.trim()) {
      return;
    }
    onSubmit(data);
  };

  return (
    <Card className="w-full max-w-md p-2 mx-auto mt-10 bg-gradient-to-t to-[#f79c33] from-[#f0f0f0]">
      <CardHeader>
        <h3 className="text-lg font-semibold">{heading}</h3>
      </CardHeader>
      <form onSubmit={handleSubmit(submitHandler)}>
        <CardBody className="space-y-4">
          <Input
            label="Title"
            placeholder="Enter note title"
            {...register("title", { required: true })}
          />
          {errors.title && <span className="text-red-500 text-sm -mt-3 pl-1">* Title is required</span>}

          <Textarea
            label="Description"
            placeholder="Enter note description"
            {...register("description", { required: true })}
            minRows={4}
          />
          {errors.description && (
            <span className="text-red-500 text-sm -mt-3 pl-1">* Description is required</span>
          )}
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button color="primary" type="submit">
            {submitLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NoteForm;