import s from './alert-modal.module.scss';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

const modalRoot = document.querySelector('#modalRoot');

export const AlertModal = ({ alert, setAlert, callback }) => {
  const { type, message } = alert;
  const dispatch = useDispatch();


  const closeModal = () => {
    setAlert({
      isAlert: false,
      type: '',
      message: '',
      callback: null,
    });
  };

  const confirm = () => {
    dispatch(callback[0]());
    if (callback[1]) {
      dispatch(callback[1]());
    }
    closeModal();
  };

  return createPortal(
    <div className={s.backdrop}>
      <div className={s.modal}>
        <p className={s.message}>{message}</p>
        {type !== 'alert' ? (
          <div className={s.btnContainer}>
            <button onClick={confirm} className={s.confirmBtn}>
              Yes
            </button>
            <button onClick={closeModal} className={s.confirmBtn}>
              No
            </button>
          </div>
        ) : (
          <div className={s.btnContainer}>
            <button onClick={closeModal} className={s.btn}>
              Ok
            </button>
          </div>
        )}
      </div>
    </div>,
    modalRoot
  );
};



