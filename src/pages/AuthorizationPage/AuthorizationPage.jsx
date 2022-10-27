import s from './auth-page.module.scss';
import AuthorizationForm from '../../components/AuthorizationForm';
import Container from '../../components/Container';

const AuthorizationPage = () => {

  return (
    <section className={s.section}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.textBlock}>
            <h1 className={s.title}>Science<span className={s.fit}>Fit</span></h1>
            <p className={s.text}>Get your fitness routine organized</p>
          </div>
          <AuthorizationForm />
        </div>
      </Container>
    </section>
  );
};

export default AuthorizationPage;
