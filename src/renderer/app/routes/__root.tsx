import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<main className="font-kanit">
      <Outlet />
    </main>
	),
	pendingComponent: PendingComponent,
	notFoundComponent: NotFound,
})

function PendingComponent() {
	return <div>PENDING</div>
}

function NotFound() {
	return <div>NOT FOUND</div>
}