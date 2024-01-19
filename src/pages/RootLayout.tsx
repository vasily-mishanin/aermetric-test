import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/users');
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <header className='flex-shrink-0 bg-pink-300'>HEADER</header>
      <main className='flex-grow flex-shrink-0 basis-auto'>
        <Outlet />
      </main>
      <footer className='flex-shrink-0 bg-green-400'>FOOTER</footer>
    </div>
  );
};
export default RootLayout;
