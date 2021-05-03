import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Colors from '../constants/Colors'
import { createStackNavigator } from 'react-navigation-stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: {
        screen: MealDetailScreen
    }
}, {mode: 'modal',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS==='android'? Colors.primaryColor : 'white'
        },
        headerTintColor: Platform.OS==='android' ? 'white' : Colors.primaryColor
    }
});

export default createAppContainer(MealsNavigator);