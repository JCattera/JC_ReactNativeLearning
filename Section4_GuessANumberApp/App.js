import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [numGuesses, setNumGuesses] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading 
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={(err) => console.log(err)} 
    />;
  };

  const restartGameHandler = () => {
    setNumGuesses(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setNumGuesses(numOfRounds);
  };

  let content =  <StartGameScreen onStartGame={startGameHandler}/>

  if(userNumber && numGuesses <= 0){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
  } else if (numGuesses > 0){
    content = <GameOverScreen roundCount={numGuesses} userNumber={userNumber} onRestart={restartGameHandler}/>;
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"></Header>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
