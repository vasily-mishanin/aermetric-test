import { Link } from 'react-router-dom';

export function NoMatch() {
  return (
    <div className='p-8'>
      <h2>No page found </h2>
      <p>
        <Link className='text-sky-400' to='/'>
          Go to the home page
        </Link>
      </p>
    </div>
  );
}
