import { User } from '../../types';

const UserListItem = ({ user }: { user: User }) => {
  return (
    <div className='grid grid-cols-[80px,160px] gap-4 items-center lg:grid-cols-[128px,160px]'>
      <div className='w-20 lg:w-32'>
        <img className='w-full h-auto' src={user.image} />
      </div>
      <p className='text-2xl font-bold'>{user.firstName}</p>
    </div>
  );
};
export default UserListItem;
