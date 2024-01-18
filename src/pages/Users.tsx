import { observer } from 'mobx-react';
import { UsersStore, usersStore } from '../store/usersStore';

interface UsersProps {
  // Define your props here, including the 'store' prop
  store: UsersStore;
}

const Users = observer(({ store }: UsersProps) => {
  return (
    <div>
      <h1 className='text-green-400'>Super Users</h1>
      {store.users.map((user) => (
        <p>{user.name}</p>
      ))}
    </div>
  );
});

export default Users;
