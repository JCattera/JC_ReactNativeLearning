import React from 'react';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealsScreen = (props) => {
  const catId = props.navigation.getParam('category');

  const categoryMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(catId)
  );

  return (
    <MealList
      displayedMeals={categoryMeals}
      navigateFunction={props.navigation.navigate}
    />
  );
};
CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam('category');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);
  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealsScreen;
