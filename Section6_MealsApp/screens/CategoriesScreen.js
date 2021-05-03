import React from 'react';
import {View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';



const CategoriesScreen = props => {
    const renderGriditem = (itemData) => {
        return (
           <CategoryGridTile 
            title={itemData.item.title}
            color={itemData.item.color}
            onSelect={() => {
                props.navigation.navigate({
                    routeName: 'CategoryMeals', 
                    params: {
                        category: itemData.item.id
                    }
                });
            }}
           />
        )
    };
    return (
        <FlatList 
            data={CATEGORIES} 
            renderItem={renderGriditem} 
            numColumns={2}
        />
    );
};

CategoriesScreen.navigationOptions = {
    headerTitle: 'Meal Categories'
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default CategoriesScreen;