export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className='w-full h-[calc(100dvh-80px)]'>
      <div className='w-full h-full md:max-w-screen-md xl:max-w-screen-xl md:px-4 md:mx-auto'>
        {children}
      </div>
    </main>
  );
}
