import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import ReactDOM from 'react-dom';

export function Modal({ children }: PropsWithChildren) {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const observerRefValue = modalRef.current!;
    disableBodyScroll(observerRefValue);
    return () => {
      if (observerRefValue) {
        enableBodyScroll(observerRefValue);
      }
    };
  }, []);

  const handleClose = () => {
    setClosing(true);

    setTimeout(() => {
      //setClosing(false);
      navigate(-1);
    }, 300);
  };

  return ReactDOM.createPortal(
    <div
      ref={modalRef}
      className='fixed left-0 top-0 w-full h-lvh overflow-y-auto bg-black bg-opacity-75 flex justify-center items-center '
      onClick={handleClose}
    >
      <div
        className={`relative bg-slate-200 w-80 z-10 p-4 rounded-lg lg:p-8 lg:w-[600px]  ${
          closing ? 'animate-ping-down' : 'animate-ping-up'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute -top-4 -right-4 w-8 h-8 text-sm rounded-full border bg-sky-100 border-sky-500 text-sky-500 hover:scale-95 hover:cursor-pointer'
          onClick={handleClose}
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.querySelector('#portal')!
  );
}
