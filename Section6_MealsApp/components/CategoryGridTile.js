import React from 'react';
import {View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const CategoryGridTile = props => {
    return (
        <TouchableOpacity 
            style={styles.gridItem}
            onPress={props.onSelect}
        >
            <View style={{...styles.container, ...{backgroundColor: props.color}}}>
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
};


const styles= StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1
    }
});

export default CategoryGridTile;