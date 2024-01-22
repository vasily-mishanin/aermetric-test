import { PropsWithChildren, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import ReactDOM from 'react-dom';

export function Modal({ children }: PropsWithChildren) {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observerRefValue = modalRef.current!;
    disableBodyScroll(observerRefValue);
    return () => {
      if (observerRefValue) {
        enableBodyScroll(observerRefValue);
      }
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      ref={modalRef}
      className='fixed left-0 top-0 w-full h-lvh overflow-y-auto bg-black bg-opacity-75 flex justify-center items-center '
      onClick={() => navigate(-1)}
    >
      <div
        className='relative bg-slate-300 w-80 z-10 p-4 rounded-lg lg:p-8 lg:w-[600px]'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute -top-4 -right-4 w-8 h-8 text-sm rounded-full border bg-sky-100 border-sky-500 text-sky-500 opacity-75 hover:opacity-100 hover:cursor-pointer'
          onClick={() => navigate(-1)}
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.querySelector('#portal')!
  );
}
