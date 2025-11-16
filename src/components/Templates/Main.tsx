export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className='w-full h-[calc(100dvh-80px)]'>
      <div className='flex items-center w-full h-full md:max-w-screen-md xl:max-w-screen-xl px-4 mx-auto'>
        {children}
      </div>
    </main>
  );
}
