import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/mealsActions';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      const mealIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (mealIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(mealIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(meal),
        };
      }
    }
    case SET_FILTERS: {
      const appliedFilters = action.filters;
      const newFilteredMeals = state.meals.filter((meal) => {
        // if (appliedFilters.glutenFree && !meal.isGlutenFree) {
        //   return false;
        // }
        // if (appliedFilters.vegan && !meal.isVegan) {
        //   return false;
        // }
        // if (appliedFilters.vegetarian && !meal.isVegetarian) {
        //   return false;
        // }
        // if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
        //   return false;
        // }
        // return true;
        return (
          (meal.isGlutenFree || !appliedFilters.glutenFree) &&
          (meal.isVegan || !appliedFilters.vegan) &&
          (meal.isVegetarian || !appliedFilters.vegetarian) &&
          (meal.isLactoseFree || !appliedFilters.lactoseFree)
        );
      });
      return { ...state, filteredMeals: newFilteredMeals };
    }
    default:
      return state;
  }
};

export default mealsReducer;
