import React, { useState} from 'react';
import { StyleSheet, View, FlatList, Button} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, updateCourseGoals] = useState([]);
  const [modalVisibility, changeModalVisibility] = useState(false);

  const addGoalHandler = (newGoalTxt) => {
    //updateCourseGoals([...courseGoals,enteredGoal]) // not ideal if we want 100% up-to-date
    updateCourseGoals(currentGoals => [
      ...currentGoals, 
      { uid: Math.random().toString(), value: newGoalTxt}
    ]);
    changeModalVisibility(false);
  };

  const removeGoalHandler = goalId => {
    updateCourseGoals(currentGoals=> {
      return currentGoals.filter((goal) => goal.uid !== goalId)
    })
  };

  const cancelGoalAddHandler = () => {
    changeModalVisibility(false);
  }
  return (
    <View style={styles.screen}>
      <Button title="Add Goal" onPress={() => changeModalVisibility(true)}/>
      <GoalInput 
        onAddGoal={addGoalHandler} 
        onCancel={cancelGoalAddHandler} 
        isVisible={modalVisibility}
      />
      <FlatList 
        keyExtractor={(item, index) => item.uid}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem 
            id={itemData.item.uid} 
            onDelete={removeGoalHandler} 
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
