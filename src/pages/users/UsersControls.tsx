import { useCallback, useMemo, useState } from 'react';
import {
  LIMIT_10,
  LIMIT_20,
  LIMIT_40,
  DEFAULT_LIMIT,
} from '../../services/constants';
import { debounce } from '../../utils/debounce';

const DEBOUNCE_TIME = 3000;

const limits = [DEFAULT_LIMIT, LIMIT_10, LIMIT_20, LIMIT_40];

//TODO - add debounce on Search

type UsersControlsProps = {
  onShow: (n: number) => void;
  onSearch: (query: string) => void;
};

const UsersControls = ({ onShow, onSearch }: UsersControlsProps) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useMemo(
    () => debounce(onSearch, DEBOUNCE_TIME),
    [DEBOUNCE_TIME]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
    if (query) {
      debouncedSearch(e.target.value);
    }
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
            className='w-6 h-6 text-center bg-sky-900 sm:rounded-md transition-colors hover:cursor-pointer hover:bg-sky-600'
            onClick={() => onShow(limit)}
          >
            {limit}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type='search'
          value={query}
          onChange={onChange}
          className='py-1 px-2 w-40 xsm:w-48 sm:w-64'
        />
      </form>
    </div>
  );
};
export default UsersControls;
