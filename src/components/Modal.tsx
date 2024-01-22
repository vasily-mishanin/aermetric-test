import { PropsWithChildren, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import ReactDOM from 'react-dom';

export function Modal({ children }: PropsWithChildren) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
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
      className='fixed left-0 top-0 w-full h-lvh overflow-y-auto bg-black opacity-80'
      onClick={() => navigate(-1)}
    >
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.querySelector('#portal')!
  );
}
