import D20Logo from '@/assets/D20';

export default function Home() {
  return (
    <div className='bg-secondary w-screen h-screen'>
      <main className='flex w-full h-full items-center justify-center'>
        <div className='bg-primary w-96 h-96 flex flex-col items-center justify-evenly rounded-3xl text-color-text'>
          <D20Logo />
          <h1 className='font-[family-name:var(--font-kanit)]'>
            ROLL FOR INITIATIVE
          </h1>
          <button className='bg-button w-72 h-16 rounded-2xl hover:bg-secondary transition-all duration-200 font-[family-name:var(--font-inter)] font-extrabold'>
            Login
          </button>
        </div>
      </main>
    </div>
  );
}
