import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { CATEGORIES } from '../data/dummy-data'

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('category');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    return (
        <View style={styles.screen}>
            <Text>The Category Meals Screen!</Text>
            <Text>{selectedCategory.title}</Text>
            <Button title="Go to Details!" onPress={() => {
                props.navigation.navigate({routeName: 'MealDetail'});
            }}/>
            <Button title="Go back" onPress={() => {
                props.navigation.pop();
            }}></Button>
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