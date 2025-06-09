import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/Dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>DASHBOARD LAYOUT</h1>
      <Outlet />
    </div>
  )
}
