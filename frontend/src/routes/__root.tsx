import { createRootRoute , Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Navbar from '../components/Navbar';

export const Route = createRootRoute({
  component: RootLayout
});

function RootLayout (){
  return(
    <>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Navbar/>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
}