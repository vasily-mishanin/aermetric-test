import { observer } from 'mobx-react-lite';
import { UsersStore } from '../../store/usersStore';
import { useEffect, useRef, useState } from 'react';
import UsersList from './UsersList';
import UsersControls from './UsersControls';
import { useInView } from 'react-intersection-observer';
import { delay } from '../../utils/delay';
import Spinner from '../../components/Spinner';
import { LOAD_TYPE } from '../../types';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { constructQueryParamsObject } from '../../services/utils';

interface UsersProps {
  store: UsersStore;
}

const UsersPage = observer(({ store }: UsersProps) => {
  const { ref, inView } = useInView({ threshold: 0.3, initialInView: false });

  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [step, toggleStep] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  const leftResults = store.totalResults - store.users.length;
  const path = location.pathname;
  const searchString = location.search;
  const queryParams = constructQueryParamsObject(searchString);

  useEffect(() => {
    // initial load - Restore state from URL
    if (isFirstRender.current) {
      isFirstRender.current = false;
      initialLoad();
      setPagesLoaded((p) => p + 1);
    }

    // download MORE users on scroll
    if (inView && !isFirstRender.current) {
      loadMoreUsers();
    }
  }, [inView, step]);

  const initialLoad = async () => {
    await store.loadUsers(queryParams, LOAD_TYPE.RESET, path);
  };

  const loadMoreUsers = async () => {
    await delay(1000);
    const skipValue = store.users.length;

    if (skipValue > 0) {
      setSearchParams((prev) => {
        prev.set('skip', skipValue.toString());
        return prev;
      });
    }
    queryParams.skip = (searchParams.get('skip') ?? queryParams.skip) || '0';

    await store.loadUsers(queryParams, LOAD_TYPE.ADD, path);

    if (inView && leftResults > 0) {
      toggleStep((prev) => !prev);
    }
  };

  const handleSetBatch = async (limit: number) => {
    setSearchParams((prev) => {
      [...prev.entries()].forEach(([key, value]) => {
        if (!value) {
          prev.delete(key);
        }
      });
      prev.set('limit', limit.toString());
      prev.set('skip', '');
      return prev;
    });
    queryParams.limit = limit;
    queryParams.skip = '';
    await store.loadUsers(queryParams, LOAD_TYPE.RESET, path);
  };

  const handleSearch = (query: string) => {
    const { q, ...restQuery } = queryParams;
    if (!query) {
      store.loadUsers(restQuery, LOAD_TYPE.RESET, '/users');
      setSearchParams('');
      navigate('/users');
      return;
    }
    store.loadUsers({ q: query }, LOAD_TYPE.RESET, '/users/search');
    navigate(`/users/search?q=${query}`);
  };

  return (
    <section
      className={`flex flex-col items-center mb-8 ${
        store.numberOfRequests > 0 ? 'opacity-75' : ''
      }`}
    >
      <h1 className='mb-4 text-center text-slate-400'>Our Cute Users</h1>
      <UsersControls onShow={handleSetBatch} onSearch={handleSearch} />
      {store.users.length > 0 && <UsersList users={store.users.slice()} />}

      {store.users.length < 1 && !leftResults && (
        <p className='text-orange-400'>No such users</p>
      )}

      {!leftResults && store.users.length > 0 && (
        <p className='text-orange-400'>That is all users</p>
      )}

      {leftResults > 0 && pagesLoaded > 0 && (
        <div ref={ref}>
          <Spinner />
        </div>
      )}
    </section>
  );
});

export default UsersPage;
