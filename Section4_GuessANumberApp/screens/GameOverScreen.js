import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';
const GameOverScreen = props => {
    return (
        <View style={styles.screen}> 
            <TitleText>Game Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                source={require('../assets/success.png')}
                // fadeDuration={300}
                // source={{uri: 'https://www.pixelstalk.net/wp-content/uploads/2016/04/Mountain-wallpaper-HD-pictures-images-photos.jpg'}}
                style={styles.image} 
                resizeMode="cover"/>
            </View>
            <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>Your phone took <Text style={styles.highlight}>{props.roundCount}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.</BodyText>
            </View>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    )
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        borderRadius: 150,
        borderWidth: 3,
        width: 300,
        height: 300,
        borderColor: 'black',
        overflow: "hidden",
        marginVertical: 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20

    }
})
export default GameOverScreen;