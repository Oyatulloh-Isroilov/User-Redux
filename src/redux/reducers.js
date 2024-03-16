import {
  ADD_INFO,
  REMOVE_INFO,
  ADD_AGE,
  ADD_USER,
  UPDATE_USER,
} from "./actions";

const initialState = {
  items: [],
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INFO:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_INFO:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
      };
    case ADD_AGE:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
