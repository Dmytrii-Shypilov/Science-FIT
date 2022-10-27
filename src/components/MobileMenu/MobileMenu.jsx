import s from './mobile-menu.module.scss'
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom'
import close from '../../images/close.svg'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../redux/user/user-operations'

const modalRoot = document.querySelector('#modalRoot')
const getClassName = ({ isActive }) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };


const MobileMenu = ({closeMenu}) => {
    const dispatch = useDispatch()
    const toLogOut = () => {
        dispatch(logOutUser())
        closeMenu()
    }

    return createPortal(
            <div className={s.modal}>
                <div onClick={closeMenu} className={s.closeBtn}>
                    <img src={close} alt="" />
                </div>
                <ul className={s.list}>
                    <li className={s.listItem}><NavLink onClick={closeMenu} className={getClassName} to="/home">Home</NavLink></li>
                    <li className={s.listItem}><NavLink onClick={closeMenu} className={getClassName} to="/my-training">Training</NavLink></li>
                    <li className={s.listItem}><NavLink onClick={closeMenu} className={getClassName} to="/calendar">Calendar</NavLink></li>
                    <li className={s.listItem}><span onClick={toLogOut}>Log Out</span></li>
                </ul>
            </div>,
        modalRoot
    )
}

export default MobileMenu