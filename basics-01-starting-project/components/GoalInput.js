import React,{ useState} from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');
    const goalInputHandler = (enteredText) =>{
        setEnteredGoal(enteredText);
    }
    const goalPressHandler = () => {
        props.onAddGoal(enteredGoal);
        setEnteredGoal('');
    }
    const goalCancelHandler = () =>{
        props.onCancel();
        setEnteredGoal('');
    }
    return (
        <Modal visible={props.isVisible} animationType={'slide'}>
            <View style={styles.inputContainer}>
                <TextInput
                placeholder="Course Goal"
                style={styles.goalInput}
                onChangeText = {goalInputHandler}
                value={enteredGoal}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="CANCEL" onPress={goalCancelHandler} color="red"/>
                    </View>
                    <View style={styles.button}>
                        <Button title="ADD" onPress={goalPressHandler}/>
                    </View>
                </View>
                
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    goalInput: {
        width: '80%',
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        margin: 10
    },
      buttonContainer: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-around'
    },
    button: {
        width: '35%'
    }
      
})

export default GoalInput;