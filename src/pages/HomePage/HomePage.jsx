import s from './home.module.scss';
import fitness from '../../images/builder.webp';
import Container from '../../components/Container';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <section className={s.section}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.textBlock}>
            <h1 className={s.title}>
              Welcome to <span className={s.sci}>SCIENCE</span>
              <span className={s.fit}>FIT</span>
            </h1>
            <p className={s.text}>
              You can start with{' '}
              <NavLink className={s.link} to="/my-training">
                creating
              </NavLink>{' '}
              your own training
            </p>
            <p className={s.text}>
              Or{' '}
              <NavLink className={s.link} to="/calendar">
                schedule
              </NavLink>{' '}
              already existing trainings
            </p>
          </div>
          <div>
            <img className={s.image} src={fitness} alt="" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomePage;
