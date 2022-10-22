import { NavLink } from 'react-router-dom';
import s from './header.module.scss';
import logo from '../../images/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/user/user-selector';
import { logOutUser } from '../../redux/user/user-operations';
import Container from '../Container';

const getClassName = ({ isActive }) => {
  return isActive ? `${s.link} ${s.active}` : s.link;
};

const Header = () => {
  const dispatch = useDispatch();
  const { email, token } = useSelector(getUser);

  const logOut = () => {
    dispatch(logOutUser(token));
    localStorage.clear();
  };

  return (
    <header className={s.header}>
    <Container>
        <div className={s.headerWrapper}>
          <div className={s.navPanel}>
            
              <img className={s.image} src={logo} alt="logo" />
           
            <nav>
              <ul className={s.list}>
                {token && (
                  <>
                    <li className={s.listItem}>
                      <NavLink to="/home" className={getClassName}>
                        Home
                      </NavLink>
                    </li>
                    <li className={s.listItem}>
                      <NavLink to="/my-training" className={getClassName}>
                        My Training
                      </NavLink>
                    </li>
                    <li className={s.listItem}>
                      <NavLink to="/calendar" className={getClassName}>
                        Calendar
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>

          {token && (
            <div className={s.userPanel}>
              <span className={s.userName}>{email}</span>
              <span className={s.btn} onClick={logOut}>
                Log out
              </span>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
