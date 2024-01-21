import { Link, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/users');
    }
  }, [location.pathname]);

  return (
    <div className='flex flex-col gap-4 h-full'>
      <header className='h-10 p-4 flex-shrink-0 bg-slate-500 flex items-center'>
        <Link to='/users'> Users</Link>
      </header>
      <main className='flex-grow flex-shrink-0 basis-auto'>
        <Outlet />
      </main>
      <footer className='flex-shrink-0 bg-sky-700 flex items-center justify-center'>
        FOOTER
      </footer>
    </div>
  );
};
export default RootLayout;
