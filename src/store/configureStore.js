import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import defaultReducer from '../reducers/defaultReducer';

// function fetchParagraphMid(forPerson) {
//   return function(dispatch) {
//     return fetchParagraph().then(
//       sauce => dispatch(makeASandwich(forPerson, sauce)),
//       error => dispatch(apologize('The Sandwich Shop', forPerson, error))
//     )
//   }
// }

export default () => {
  const store = createStore(defaultReducer, applyMiddleware(thunk));

  return store;
};