import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';

const CategoryMealsScreen = props => {
    const renderMealItem = itemData => { //renders each meal item
        return (
            <MealItem
                title={itemData.item.title}
                onSelectMeal={/*() => {
                    props.navigation.navigate({
                        routeName: 'MealDetail', 
                        params: {
                            category: itemData.item.id
                        }
                    });
                }*/}
            />
        );
    };

    const catId = props.navigation.getParam('category');
    const displayedMeals = MEALS.filter(meal => meal.categoryIds.includes(catId))

    return (
        <View style={styles.screen}>
            <FlatList 
              data={displayedMeals} 
              keyExtractor={(item, index)=> item.id}
              renderItem={renderMealItem}/>
        </View>
    );
};
CategoryMealsScreen.navigationOptions = (navigationData) => {
    const categoryId = navigationData.navigation.getParam('category');
    const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);
    return {
        headerTitle: selectedCategory.title    
    }
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default CategoryMealsScreen;