import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;
    
    useEffect(() => {
        if ( currentGuess === userChoice ){
            onGameOver(rounds);
        }
    },[currentGuess, userChoice, onGameOver]); //added rounds - JC
    const nextGuessHandler = direction => {
        // validate direction
        if(
        (direction==="lower" && (currentGuess < props.userChoice))||
        (direction==="higher" && (currentGuess > props.userChoice))){
            console.log("false");
            Alert.alert("Liar!","Your poker face is terrible.", [{text: 'Curses', style: 'cancel'}]);
            return;
        }
        //set new boundaries for GenerateRandomBetween
        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        }
        else{
            currentLow.current = currentGuess;
        }
        //set nextNumber
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber);
        setRounds(currentRounds => currentRounds + 1);
    };
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>The program guessed:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title='Lower' onPress={nextGuessHandler.bind(this,"lower")} />
                <Button title='Higher' onPress={nextGuessHandler.bind(this,"higher")} />
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
    buttonContainer: {
        flexDirection: 'row',
        width: 300,
        maxWidth: '80%',
        justifyContent: 'space-around',
        marginTop: 20
    }

});

export default GameScreen;