import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import usersReducer from '../Reducers/usersReducer'

const configStore = () => {
  const store = createStore(
    combineReducers({
      users: usersReducer
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configStore;
