import React from 'react';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';
import { useSelector } from 'react-redux';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealsScreen = (props) => {
  const catId = props.navigation.getParam('category');

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const categoryMeals = availableMeals.filter((meal) =>
    meal.categoryIds.includes(catId)
  );
  if (categoryMeals.length === 0 || !categoryMeals) {
    return (
      <View style={styles.content}>
        <DefaultText style={styles.text}>
          No meals available for selected filters.
        </DefaultText>
      </View>
    );
  } else {
    return (
      <MealList
        displayedMeals={categoryMeals}
        navigateFunction={props.navigation.navigate}
      />
    );
  }
};
CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam('category');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);
  return {
    headerTitle: selectedCategory.title,
  };
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default CategoryMealsScreen;
