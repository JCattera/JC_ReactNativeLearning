import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

const MealItem = props => {

    return (
        <View style={styles.mealItem}>
        <TouchableOpacity onPress={props.onSelectMeal}>
            <View>
                <View style={styles.mealRow}>
                    <Text>{props.title}</Text>
                </View> 
            <View style={styles.mealRow}></View>
            </View>

        </TouchableOpacity>
        </View>
    );
};

const styles= StyleSheet.create({
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#ccc'
    },
    mealRow: {
        flexDirection='row' //rows of data
    }
});

export default MealItem;