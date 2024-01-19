import { LIMIT_10, LIMIT_20, LIMIT_40 } from '../../services/constants';

const UsersControls = ({ onShow }: { onShow: (n: number) => void }) => {
  return (
    <div className='px-8 pb-2 flex gap-2 justify-end'>
      Show:
      <button
        className='w-7 text-center bg-blue-200'
        onClick={() => onShow(LIMIT_10)}
      >
        {LIMIT_10}
      </button>
      <button
        className='w-7 text-center bg-blue-200'
        onClick={() => onShow(LIMIT_20)}
      >
        {LIMIT_20}
      </button>
      <button
        className='w-7 text-center bg-blue-200'
        onClick={() => onShow(LIMIT_40)}
      >
        {LIMIT_40}
      </button>
    </div>
  );
};
export default UsersControls;
