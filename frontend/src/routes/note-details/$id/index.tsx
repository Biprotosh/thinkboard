import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import type { INote } from '../../../types/Note';
import axios from 'axios';

export const Route = createFileRoute('/note-details/$id/')({
  component: EditNote,
});

function EditNote() {

  const { id } = useParams({ from: "/note-details/$id/" });

  const { data, isLoading, isError, error } = useQuery<AxiosResponse<INote>>({
    queryKey: ["api", "notes", id], // cache per id
    queryFn: () => axios.get(`http://localhost:5001/api/notes/${id}`),
    staleTime: 30000
  });

  if (isLoading) return <div>Loading note...</div>;
  if (isError) return <div>{(error as Error).message}</div>;

  return (
    <Card className="w-full max-w-md p-2 mx-auto mt-10 shadow-lg border border-gray-200 bg-white">
      <CardHeader className="flex flex-col items-start gap-1">
        <h3 className="text-xl font-semibold">{data?.data.title}</h3>
        <span className="text-xs text-gray-400">
          {data?.data.createdAt ? new Date(data?.data.createdAt).toLocaleDateString() : "Unknown Date"}
        </span>
      </CardHeader>

      <CardBody>
        <p className="text-gray-700 whitespace-pre-line">{data?.data.description}</p>
      </CardBody>

      <CardFooter className="flex justify-end gap-3">
        <Link to='/update-note/$id' params={{id: id}}>
        <Button color="primary" variant="flat">
          Update
        </Button>
        </Link>
        <Button color="danger" variant="flat">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
