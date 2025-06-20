import { createFileRoute, Outlet, Link, useRouteContext } from '@tanstack/react-router'
import D20Logo from '../../../assets/D20'
import { useEffect } from 'react'

export const Route = createFileRoute('/Dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id, avatar, username, logout } = useRouteContext({ from: '/Dashboard' })

  const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`

  return (
    <div className='flex h-full'>
      <aside className='bg-primary h-full p-5 w-52 flex flex-col items-center justify-between'>
        <D20Logo stroke='#31465e' className='bg-terciary p-2 rounded-full'/>
        <nav className='flex flex-col items-center justify-evenly h-80'>
          <Link to='/Dashboard' className='bg-buttoncolor p-5 w-36 text-center rounded-2xl transition-all duration-100 hover:bg-terciary hover:text-primary' activeProps={{ className: 'bg-terciary text-primary' }}>Dashboard</Link>
          <Link to='/' className='bg-buttoncolor p-5 w-36 text-center rounded-2xl transition-all duration-100 hover:bg-terciary hover:text-primary'>Personagens</Link>
          <Link to='/' className='bg-buttoncolor p-5 w-36 text-center rounded-2xl transition-all duration-100 hover:bg-terciary hover:text-primary'>Campanhas</Link>
        </nav>
        <div className='flex'>
          <div>
            <p>{username}</p>
            <img src={avatarUrl} alt="Imagem de usuário" className='size-12 rounded-full'/>
          </div>
          <button onClick={logout} className='bg-fail cursor-pointer'>sair</button>
        </div>
      </aside>
      <Outlet />
    </div>
  )
}
