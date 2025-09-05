import { createFileRoute } from '@tanstack/react-router';
import NoteCard from '../components/NoteCard';
import { useQuery } from '@tanstack/react-query';
import axios, { type AxiosResponse } from 'axios';
import type { INote } from '../types/Note';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {

  const {data, isLoading, isError, error} = useQuery<AxiosResponse<INote[]>>({
    queryKey: ["api", "notes"],
    queryFn: () => {
      return axios.get("http://localhost:5001/api/notes");
    },
    staleTime: 30000, // 30000 ms 
    // refetchInterval: 1000 // it will refetch data every single second
  });

  if(isLoading) return <div>Page is loading...</div>;
  if(isError) return <div>{error.message}</div>;

  // console.log(data);

  return (
    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data?.data.map((note) => (
        <div key={note._id}>
          <NoteCard {...note}/>
        </div>
      ))}
    </div>
  );
}