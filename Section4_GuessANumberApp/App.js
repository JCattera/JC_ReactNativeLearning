import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [numGuesses, setNumGuesses] = useState(0);

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
