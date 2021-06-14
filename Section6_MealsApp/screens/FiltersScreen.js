import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/mealsActions';

const FilterItem = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : 'white'}
        value={props.value}
        onValueChange={(newValue) => props.valueChange(newValue)}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const dispatch = useDispatch();
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegetarian: isVegetarian,
      vegan: isVegan,
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterItem
        label="Gluten-free"
        value={isGlutenFree}
        valueChange={setIsGlutenFree}
      />
      <FilterItem
        label="Lactose-free"
        value={isLactoseFree}
        valueChange={setIsLactoseFree}
      />
      <FilterItem label="Vegan" value={isVegan} valueChange={setIsVegan} />
      <FilterItem
        label="Vegetarian"
        value={isVegetarian}
        valueChange={setIsVegetarian}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Meal Filters',
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
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName="ios-save"
            onPress={() => {
              navData.navigation.getParam('save')();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,
  },
});
export default FiltersScreen;
