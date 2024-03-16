export const ADD_INFO = "ADD_INFO";
export const REMOVE_INFO = "REMOVE_INFO";
export const ADD_AGE = "ADD_AGE";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";

export const addInfo = (text) => ({
  type: ADD_INFO,
  payload: {
    id: new Date().getTime(),
    text,
  },
});

export const addAge = (age) => ({
  type: ADD_AGE,
  payload: {
    age,
  },
});

export const addUser = (name, age, email, password) => ({
  type: ADD_USER,
  payload: {
    id: new Date().getTime(),
    name,
    age,
    email,
    password,
  },
});

export const removeInfo = (id) => ({
  type: REMOVE_INFO,
  payload: {
    id,
  },
});

export const updateUser = (id, name, age, email, password) => ({
    type: UPDATE_USER,
    payload: {
      id,
      name,
      age,
      email,
      password,
    },
  });