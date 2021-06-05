import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE } from '../actions/mealsActions';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
    // const existingIndex = state.favoriteMeals.findIndex(
    //   (meal) => (meal.id = action.mealId)
    // );
    // if (existingIndex >= 0) {
    //   return {
    //     ...state,
    //     favoriteMeals: state.favoriteMeals.filter(
    //       (meal) => meal.id !== action.mealId
    //     ),
    //   };
    // } else {
    //   return { ...state, favoriteMeals: state.favoriteMeals.concat() };
    // }
    default:
      return state; // reached when redux store initialized
  }
};

export default mealsReducer;
