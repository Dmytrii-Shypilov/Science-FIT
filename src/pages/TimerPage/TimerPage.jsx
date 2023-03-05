import s from "./timer-page.module.scss";
import TrainingTimer from "../../components/TrainingTimer/TrainingTimer";
import Container from "../../components/Container";
import { useSelector } from "react-redux";
import { getTrainings } from "../../redux/trainings/trainings-selector";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TimerPage = () => {
  const [trainingData, setTrainingData] = useState({
    name: null,
    exercises: null,
  });

  const trainings = useSelector(getTrainings); // when reloading page it is eppty array at first render
  const name = useParams().name.split("-").join(" ");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("trainingData"));
    if (!data || data.name !== name) {
      const exercises = trainings.find((tr) => tr.name === name).exercises;
      localStorage.setItem(
        "trainingData",
        JSON.stringify({
          name,
          exercises,
        })
      );
    }
  }, [trainings, name]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("trainingData"));
    if (data) {
      setTrainingData({
        name: data.name,
        exercises: data.exercises,
      });
    } 
    else {
      const exercises = trainings.find((tr) => tr.name === name).exercises;
      setTrainingData({
        exercises,
        name,
      });
    }
  }, [trainings, name]);




  return (
    <section className={s.section}>
      <Container>
       {trainingData.name && <TrainingTimer
          name={trainingData.name}
          exercises={trainingData.exercises}
        />}
      </Container>
    </section>
  );
};

export default TimerPage;
