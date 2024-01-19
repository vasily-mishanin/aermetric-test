import { observer } from 'mobx-react-lite';
import { UsersStore, usersStore } from '../../store/usersStore';
import { useEffect } from 'react';
import UsersList from './UsersList';
import { LIMIT_10, LIMIT_20, LIMIT_40 } from '../../services/constants';
import UsersControls from './UsersControls';

interface UsersProps {
  // Define your props here, including the 'store' prop
  store: UsersStore;
}

const UsersPage = observer(({ store }: UsersProps) => {
  useEffect(() => {
    console.log('Effect', store.users);
  }, []);

  const handleShowUsers = (n: number) => {
    store.loadUsers({ limit: n });
  };

  console.log('USERS', store.users.slice());

  return (
    <div>
      <h1 className='pb-2 text-center text-green-400'>Our Users</h1>
      <UsersControls onShow={handleShowUsers} />
      {store.numberOfRequests > 0 && (
        <h2>Loading... - {store.numberOfRequests}</h2>
      )}

      <UsersList users={store.users.slice()} />
    </div>
  );
});

export default UsersPage;
