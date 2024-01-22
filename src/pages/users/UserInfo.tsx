import { observer } from 'mobx-react-lite';
import { UsersStore } from '../../store/usersStore';
import { useParams } from 'react-router-dom';

const UserInfo = observer(({ store }: { store: UsersStore }) => {
  const params = useParams();

  const foundUser = store.users
    .slice()
    .find((user) => user.id === parseInt(params.id!));

  if (foundUser) {
    const { firstName, lastName, email, image, company } = foundUser;
    return (
      <article className='flex flex-col gap-2 text-sky-600'>
        <div className='w-1/2 self-center'>
          <img className='w-full h-auto' src={image} />
        </div>
        <h3 className='text-2xl font-bold lg:text-3xl'>
          {firstName} {lastName}
        </h3>
        <div className='italic hover:cursor-pointer hover:text-indigo-600 lg:text-2xl'>
          <a href={`mailto:${email}`}>{email}</a>
        </div>

        <div className='lg:text-2xl'>
          <h4 className='font-bold'>Company:</h4>
          <p>{company.name}</p>
          <p>{company.address.city}</p>
          <h5 className='font-bold'>Title:</h5>
          <p>{company.title}</p>
        </div>
      </article>
    );
  }

  return <p>No user with this id - {params.id}</p>;
});
export default UserInfo;
