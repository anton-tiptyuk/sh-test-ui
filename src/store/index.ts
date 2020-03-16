import { combineReducers } from 'redux';
import videosReducer from './videos';

export const appReducer = combineReducers({
  videos: videosReducer,
});
