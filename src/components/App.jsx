import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrainings } from "../redux/trainings/trainings-operations";
import { PublicRoute } from "../routes/PublicRoute";
import { PrivateRoute } from "../routes/PrivateRoute";
import { getUser } from "../redux/user/user-selector";
import Loader from "./Loader";
import { getCurrentUser } from "../redux/user/user-operations";

import Header from "./Header";
import Footer from "./Footer";
const HomePage = lazy(() =>
  import("../pages/HomePage" /* webpackChunkName: "home" */)
);
const AuthorizationPage = lazy(() =>
  import("../pages/AuthorizationPage" /* webpackChunkName: "authorization" */)
);
const MyTrainingPage = lazy(() =>
  import("../pages/MyTrainingPage" /* webpackChunkname: "my-training" */)
);
const CalendarPage = lazy(() =>
  import("../pages/CalendarPage" /* webpackChunkName: "calendar" */)
);
const TimerPage = lazy(() =>
  import("../pages/TimerPage" /* webpackChunkName: "training-timer" */)
);

export const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(getUser);
  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser(token));
      dispatch(fetchTrainings(token));
    }
  }, [token, dispatch]);

  return (
    <>
      <div className="wrapper">
        <Suspense fallback={<Loader />}>
          <Header />
          <Routes>
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/my-training"
              element={
                <PrivateRoute>
                  <MyTrainingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <PrivateRoute>
                  <CalendarPage />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="*"
              element={
                <PublicRoute>
                  <AuthorizationPage />
                </PublicRoute>
              }
            ></Route>
            {!token && (
              <Route
                path="/authorization"
                element={
                  <PublicRoute>
                    <AuthorizationPage />
                  </PublicRoute>
                }
              ></Route>
            )}
            <Route
              path="/timer/:name"
              element={
                <PrivateRoute>
                  <TimerPage />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
};
