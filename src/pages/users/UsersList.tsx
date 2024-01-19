import { User } from '../../types';

const UsersList = ({ users }: { users: User[] }) => {
  return (
    <ul className='px-8 py-4 mb-8 flex gap-y-4 gap-x-8 justify-start flex-wrap'>
      {users.map((user, index) => (
        <li key={user.id}>
          <div className='grid grid-cols-[80px,160px] gap-4 items-center'>
            <div className='w-20'>
              <img className='w-full h-auto' src={user.image} />
            </div>
            <p className='text-2xl font-bold'>{user.firstName}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default UsersList;

//pl-[calc(50%-80px)]
