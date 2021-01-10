import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import Colors from '../constants/colors'; 
import Card from '../components/Card';
import Input from '../components/Input';
const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const numberInputHandler = inputText => {};
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Start New Game</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input blurOnSubmit autoCapitalize='none' autoCorrect={false} maxLength={2} keyboardType="number-pad" styles={styles.input}></Input>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Reset" onPress={() => {}} color={Colors.accent}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm" onPress={() => {}} color={Colors.primary}/>
                    </View>
                </View>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10

    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input:{
        width: 50,
        textAlign: 'center'
    }
});

export default StartGameScreen;