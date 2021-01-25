import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Colors from '../constants/colors'; 
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number',
                'Number must be between 1 and 99 (inclusive).', 
                [{text: 'OK', style: 'default', onPress: resetInputHandler}]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = <Card style={styles.summaryContainer}>
            <Text>Your selection:</Text>
            <NumberContainer>
                {selectedNumber}
            </NumberContainer>
            <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/></Card>
    }
    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start New Game</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input 
                    blurOnSubmit 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    maxLength={2} 
                    keyboardType="number-pad" 
                    styles={styles.input}
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                ></Input>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
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
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    summaryContainer: {
        marginTop: 20,
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