import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import Navbar from '@/components/Navbar'



export const Route = createRootRoute({
    component: () => (
        <>
            <div className="max-w-6xl mx-auto px-4 py-4">
                <Navbar />
                <Outlet />
            </div>
            <TanstackDevtools
                config={{
                    position: 'bottom-left',
                }}
                plugins={[
                    {
                        name: 'Tanstack Router',
                        render: <TanStackRouterDevtoolsPanel />,
                    },
                ]}
            />
        </>
    ),
})
