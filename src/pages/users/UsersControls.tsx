import { useEffect, useMemo, useState } from 'react';
import {
  LIMIT_10,
  LIMIT_20,
  LIMIT_40,
  DEFAULT_LIMIT,
} from '../../services/constants';
import { debounce } from '../../utils/debounce';
import { useSearchParams } from 'react-router-dom';

const DEBOUNCE_TIME = 2000;

const limits = [DEFAULT_LIMIT, LIMIT_10, LIMIT_20, LIMIT_40];

type UsersControlsProps = {
  onShow: (n: number) => void;
  onSearch: (query: string) => void;
};

const UsersControls = ({ onShow, onSearch }: UsersControlsProps) => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  const activeLimit = searchParams.get('limit');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const debouncedSearch = useMemo(
    () => debounce(onSearch, DEBOUNCE_TIME),
    [DEBOUNCE_TIME]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
    debouncedSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className='w-full px-4 pb-2 self-end flex gap-4 justify-between'>
      <div className='flex gap-1 text-sm items-center'>
        <span>Show:</span>
        {limits.map((limit) => (
          <button
            key={limit}
            className={`w-6 h-6 text-center text-slate-100 rounded-sm transition-colors hover:cursor-pointer hover:bg-sky-600 ${
              limit === (activeLimit && +activeLimit)
                ? 'bg-sky-600'
                : 'bg-sky-900'
            }`}
            onClick={() => onShow(limit)}
          >
            {limit}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type='search'
          placeholder='Search'
          name='searchUsers'
          value={query}
          onChange={onChange}
          className='py-1 px-2 w-40 border rounded border-slate-400 outline-none xsm:w-48 sm:w-64 transition-colors focus:border-slate-500 hover:shadow-sm hover:shadow-sky-200'
        />
      </form>
    </div>
  );
};

export default UsersControls;
