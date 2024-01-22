import { Link, useLocation } from 'react-router-dom';
import { User } from '../../types';

const UsersList = ({ users }: { users: User[] }) => {
  const location = useLocation();
  return (
    <ul className='px-8 py-4 mb-8 flex gap-y-4 gap-x-8 justify-center flex-wrap'>
      {users.map((user) => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`} state={{ previousLocation: location }}>
            <div className='grid grid-cols-[80px,160px] gap-4 items-center lg:grid-cols-[128px,160px]'>
              <div className='w-20 lg:w-32'>
                <img className='w-full h-auto' src={user.image} />
              </div>
              <p className='text-2xl font-bold'>{user.firstName}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default UsersList;
//min-h-[750px]
