import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const GoalItem = props => {
    return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onDelete.bind(this, props.id)}>
        <View style={styles.goalItem}>
            <Text>{props.title}</Text>
        </View>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({ 
    goalItem:{
        padding: 10,
        marginVertical: 10,
        borderColor: 'black',
        backgroundColor: '#ccc',
        borderWidth: 1
    }
});
export default GoalItem;

