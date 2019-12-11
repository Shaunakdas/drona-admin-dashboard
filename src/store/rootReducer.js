import { combineReducers } from 'redux';
import { standards } from './standards/reducer';
import { chapters } from './chapters/reducer';
import { games } from './games/reducer';
import { questions } from './questions/reducer';
import { questionAttributes } from './questionAttributes/reducer';
export default combineReducers({
  standards,
  chapters,
  games,
  questions,
  questionAttributes
});