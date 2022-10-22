import s from './footer.module.scss';
import Container from '../Container';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.textWrapper}>
          <p className={s.text}>ScienceFit</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
