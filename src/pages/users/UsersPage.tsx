import { observer } from 'mobx-react-lite';
import { UsersStore } from '../../store/usersStore';
import { useEffect, useMemo, useRef, useState } from 'react';
import UsersList from './UsersList';
import UsersControls from './UsersControls';
import { useInView } from 'react-intersection-observer';
import { delay } from '../../utils/delay';
import Spinner from '../../components/Spinner';
import { LOAD_TYPE, QueryParams } from '../../types';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { constructQueryParamsObject } from '../../services/utils';

interface UsersProps {
  store: UsersStore;
}

const UsersPage = observer(({ store }: UsersProps) => {
  const { ref, inView } = useInView({ threshold: 1, initialInView: false });
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [usersLeft, setUsersLeft] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  const leftResults = useMemo(
    () => store.totalResults - store.users.length,
    [store.totalResults, store.users.length]
  );
  const path = useMemo(() => location.pathname, [location.pathname]);
  const searchString = useMemo(() => location.search, [location.search]);
  const queryParams = useMemo(
    () => constructQueryParamsObject(searchString),
    [searchString]
  );
  const skip = searchParams.get('skip');

  useEffect(() => {
    console.log('--EFFECT--', { inView });
    console.log(path, searchString, leftResults, queryParams);

    // initial load - Restore state from URL
    if (isFirstRender.current) {
      console.log('INITIAL', path, searchString);
      isFirstRender.current = false;
      initialLoad();
      setPagesLoaded((p) => p + 1);
    }

    // download MORE users on scroll
    if (inView && !isFirstRender.current) {
      console.log('SCROLL');
      loadMoreUsers();
    }
  }, [inView]);
  // && !store.numberOfRequests
  // path, queryParams, leftResults, store.numberOfRequests

  const initialLoad = async () => {
    store.loadUsers(queryParams, LOAD_TYPE.RESET, path);
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
    queryParams.skip = searchParams.get('skip') ?? queryParams.skip;
    await store.loadUsers(queryParams, LOAD_TYPE.ADD, path);
  };

  const handleShowUsers = async (limit: number) => {
    console.log('CHANGE LIMIT');
    setSearchParams((prev) => {
      [...prev.entries()].forEach(([key, value]) => {
        if (!value) {
          prev.delete(key);
        }
      });
      prev.set('limit', limit.toString());
      return prev;
    });
    queryParams.limit = limit;
    await store.loadUsers(queryParams, LOAD_TYPE.RESET, path);

    if (searchParams.size === 1 && searchParams.get('limit')) {
      navigate(`/users?limit=${limit}`);
    }
  };

  const handleSearch = (query: string) => {
    console.log('SEARCH:', query);
    const { q, ...restQuery } = queryParams;
    console.log('HERE', query);
    if (!query) {
      console.log('TO USERS');
      store.loadUsers(restQuery, LOAD_TYPE.RESET, '/users');
      setSearchParams('');
      navigate('/users');
      return;
    }
    console.log(query);
    store.loadUsers({ q: query }, LOAD_TYPE.RESET, '/users/search');
    navigate(`/users/search?q=${query}`);
  };

  // console.log('UsersPage', store.users.slice());
  return (
    <section
      className={`flex flex-col items-center mb-8 ${
        store.numberOfRequests ? 'opacity-75' : ''
      }`}
    >
      <h1 className='mb-4 text-center text-slate-400'>Our Cute Users</h1>
      <UsersControls onShow={handleShowUsers} onSearch={handleSearch} />
      {store.users.length > 0 && <UsersList users={store.users.slice()} />}

      {/* {store.users.length < 1 && pagesLoaded && (
        <p className='text-orange-400'>No such users</p>
      )} */}

      {!leftResults && store.users.length > 0 && (
        <p className='text-orange-400'>That is all users</p>
      )}

      {/* {!noMoreUsers && store.users.slice().length > 0 && ( */}
      {leftResults > 0 && pagesLoaded > 0 && (
        <div ref={ref}>
          <Spinner />
        </div>
      )}
    </section>
  );
});

export default UsersPage;