import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/mealsActions';

const ListItem = (props) => {
  return (
    <View style={{ ...styles.listItem, ...props.style }}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');
  const availableMeals = useSelector((state) => state.meals.meals);

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
  const mealIsFavorite = useSelector((state) =>
    state.meals.favoriteMeals.includes(selectedMeal)
  ); //determine if current meal is favorite
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: mealIsFavorite });
  }, [mealIsFavorite]);
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      <View style={styles.ingredients}></View>
      {selectedMeal.ingredients.map((ingredient, index) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step, index) => (
        <ListItem
          style={{ borderWidth: 0, marginHorizontal: 10, padding: 5 }}
          key={index}
        >
          {index + 1}. {step}
        </ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: mealTitle,
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Favorite"
            iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
            onPress={toggleFavorite}
          />
        </HeaderButtons>
      );
    },
  };
};
const styles = StyleSheet.create({
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
    // alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  listItem: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});
export default MealDetailScreen;
