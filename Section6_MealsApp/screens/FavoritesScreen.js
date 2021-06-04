import React from 'react';
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';

const FavoritesScreen = (props) => {
  const faveMeals = useSelector((state) => state.meals.favoriteMeals);

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
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default FavoritesScreen;
