import React from 'react';
import { MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const FavoritesScreen = (props) => {
  const dummyFavorites = MEALS.filter((meal) => ['m1', 'm2'].includes(meal.id));

  return (
    <MealList
      displayedMeals={dummyFavorites}
      navigateFunction={props.navigation.navigate}
    />
  );
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'My Favorites',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default FavoritesScreen;
