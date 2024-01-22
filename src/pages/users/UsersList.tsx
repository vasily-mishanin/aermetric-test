import { Link, useLocation } from 'react-router-dom';
import { User } from '../../types';
import UserListItem from './UserListItem';

const UsersList = ({ users }: { users: User[] }) => {
  const location = useLocation();
  return (
    <ul className='px-8 py-4 mb-4 flex gap-y-4 gap-x-8 justify-center flex-wrap'>
      {users.map((user) => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`} state={{ previousLocation: location }}>
            <UserListItem user={user} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default UsersList;
