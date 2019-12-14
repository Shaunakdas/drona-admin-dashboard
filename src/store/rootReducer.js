import { combineReducers } from 'redux';
import { standards } from './standards/reducer';
import { chapters } from './chapters/reducer';
import { games } from './games/reducer';
import { questions } from './questions/reducer';
import { user } from './user/reducer';
export default combineReducers({
  standards,
  chapters,
  games,
  questions,
  user
});