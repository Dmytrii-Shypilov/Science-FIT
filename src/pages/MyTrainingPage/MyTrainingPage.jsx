import s from './my-training.module.scss';
import SetTrainingPage from './SetTrainingPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchExercises } from '../../redux/exercises/exercises-operations';
import { getExercises } from '../../redux/exercises/exercises-selector';
import Container from '../../components/Container';

const MyTrainingPage = () => {
  const dispatch = useDispatch();
  const exercises = useSelector(getExercises);

  useEffect(() => {
    if (exercises.length === 0) {
      dispatch(fetchExercises());
    }
  }, [exercises, dispatch]);

  return (
    <section className={s.section}>
      <Container>
        <SetTrainingPage />
      </Container>
    </section>
  );
};

export default MyTrainingPage;
