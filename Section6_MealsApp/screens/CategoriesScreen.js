import React from 'react';
import {View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { CATEGORIES } from '../data/dummy-data'




const CategoriesScreen = props => {
    const renderGriditem = (itemData) => {
        return (
            <TouchableOpacity style={styles.gridItem}
            onPress={() => {
                props.navigation.navigate('CategoryMeals');
            }}>
            <View>
                <Text>
                    {itemData.item.title}
                </Text>
            </View>
            </TouchableOpacity>
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
    headerTitle: 'Meal Categories',
    headerStyle: {
        backgroundColor: Platform.OS==='android'? Colors.primaryColor : 'white'
    },
    headerTintColor: Platform.OS==='android' ? 'white' : Colors.primaryColor
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
export default CategoriesScreen;