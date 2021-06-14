import React from 'react';
import { View, StyleSheet } from 'react-native';
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = (props) => {
  const faveMeals = useSelector((state) => state.meals.favoriteMeals);
  if (faveMeals.length === 0 || !faveMeals) {
    return (
      <View style={styles.content}>
        <DefaultText style={styles.text}>
          No favorite meals found. Start adding some!
        </DefaultText>
      </View>
    );
  } else {
    return (
      <MealList
        displayedMeals={faveMeals}
        navigateFunction={props.navigation.navigate}
      />
    );
  }
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
export default FavoritesScreen;
