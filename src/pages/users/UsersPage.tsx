import { observer } from 'mobx-react-lite';
import { UsersStore } from '../../store/usersStore';
import { useEffect, useRef, useState } from 'react';
import UsersList from './UsersList';
import UsersControls from './UsersControls';
import { useInView } from 'react-intersection-observer';
import { delay } from '../../utils/delay';
import { DEFAULT_LIMIT, LIMIT_10, LIMIT_20 } from '../../services/constants';
import Spinner from '../../components/Spinner';

interface UsersProps {
  // Define your props here, including the 'store' prop
  store: UsersStore;
}

const UsersPage = observer(({ store }: UsersProps) => {
  const { ref, inView } = useInView();
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [noMoreUsers, setNoMoreUsers] = useState(false);

  useEffect(() => {
    console.log('Effecr', { inView });

    if (inView) {
      console.log('LOAD');
      loadMoreUsers();
    }
  }, [inView, pagesLoaded]);

  const handleShowUsers = (n: number) => {
    store.loadUsers({ limit: n }, true);
  };

  const loadMoreUsers = async () => {
    await delay(1500);
    const nextPage = pagesLoaded + 1;
    const newUsers = await store.loadUsers({
      skip: LIMIT_10 * nextPage,
      limit: LIMIT_10,
    });

    if (!newUsers || !newUsers.length) {
      setNoMoreUsers(true);
      return;
    }

    setPagesLoaded(nextPage);
  };

  return (
    <section
      className={`flex flex-col items-center mb-8 ${
        store.numberOfRequests && pagesLoaded < 2 ? 'opacity-50' : ''
      }`}
    >
      <h1 className='pb-2 text-center text-green-400'>Our Cute Users</h1>
      <UsersControls onShow={handleShowUsers} />
      <UsersList users={store.users.slice()} />
      {noMoreUsers && <p className='text-orange-400'>No more users</p>}

      {!noMoreUsers && store.users.length && (
        <div ref={ref}>
          <Spinner />
        </div>
      )}
    </section>
  );
});

export default UsersPage;
