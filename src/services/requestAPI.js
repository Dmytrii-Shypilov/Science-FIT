import axios from 'axios';
import { Notify } from 'notiflix';

const instance = axios.create({
  baseURL: 'science-fit.up.railway.app',
});

const fetchExercises = async () => {
  try {
    const { data } = await instance.get('/exercises');
    return data;
  } catch (error) {
    if(error.response.status === 401) {
      localStorage.clear()
    }
    return ([])
  }
};

const fetchTrainings = async token => {
  try {
    const { data } = await instance.get('/trainings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if(error.response.status === 401) {
      localStorage.clear()
    }
    return ([])
  }
};

const addTraining = async (training, token) => {
  try {
    const { data } = await instance.post('/trainings/add', training, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if(error.response.status === 401) {
      localStorage.clear()
      Notify.failure(`${error.response.data.message}. Your session has expired. Please, log in again`)
    }
    return ({})
  }
};

const deleteTraining = async (id, token) => {
  try {
    const { data } = await instance.delete(`/trainings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if(error.response.status === 401) {
      localStorage.clear()
      Notify.failure(`${error.response.data.message}. Your session has expired. Please, log in again`)
    }
    return ({})
  }
};

const signUpUser = async body => {
  try {
    const { data } = await instance.post('/users/signup', body);
    return data;
  } catch (error) {
    Notify.failure(error.response.data.message);
    return ({
      token: null,
      email: null
    })
  }
};

const sigInUser = async body => {
  try {
    const { data } = await instance.post('/users/signin', body);
    return data;
  } catch (error) {
      Notify.failure(error.response.data.message)
      return ({
        token: null,
        email: null
      })
    
  }
};

const signOutUser = async token => {
  try {
    await instance.get('/users/signout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const fetchCurrentUser = async token => {
  try {
    const { data } = await instance.get('/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data;
  } catch (error) {
    if(error.response.status === 401) {
      localStorage.clear()
    }
    return ({
      token: null,
      email: null
    })

  }
};

const fetchSchedule = async (period, token) => {
  try {
    const { data } = await instance.get(`schedules/${period}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if(error.response.status === 401) {
      localStorage.clear()
    }
    return ([])
  }
};

const addScheduleItem = async (item, token) => {
  try {
    const { data } = await instance.post('/schedules/add', item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if(error.response.status === 401) {
      localStorage.clear()
      Notify.failure(`${error.response.data.message}. Your session has expired. Please, log in again`)
    }
    return ({})
  }
}

const deleteScheduleItem = async (id, token) => {
  try {
    const {data} = await instance.delete(`/schedules/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return data
  } catch (error) {
    if(error.response.status === 401) {
      localStorage.clear()
      Notify.failure(`${error.response.data.message}. Your session has expired. Please, log in again`)
    }
    return ([])
  }
}

const deleteMultipleScheduleItems = async (name, token) => {
  try {
    const {data} = await instance.delete(`/schedules/delete/multiple/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    if(error.response.status === 401) {
      localStorage.clear()
      Notify.failure(`${error.response.data.message}. Your session has expired. Please, log in again`)
    }
    return ({})
  }
}

export const requestAPI = {
  fetchExercises,
  fetchTrainings,
  fetchSchedule,
  signUpUser,
  sigInUser,
  signOutUser,
  fetchCurrentUser,
  addTraining,
  addScheduleItem,
  deleteTraining,
  deleteScheduleItem,
  deleteMultipleScheduleItems
};
