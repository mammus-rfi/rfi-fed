import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<SessionContext>()({
	component: () => (
		<main className='font-kanit h-screen text-[#e8e6d4] bg-secondary'>
			<Outlet />
		</main>
	),
	pendingComponent: PendingComponent,
	notFoundComponent: NotFound,
});

function PendingComponent() {
	return <div>PENDING</div>;
}

function NotFound() {
	return <div>NOT FOUND</div>;
}
