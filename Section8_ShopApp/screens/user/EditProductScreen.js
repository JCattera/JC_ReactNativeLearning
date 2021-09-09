import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';

const FORM_UPDATE = 'FORM_UPDATE';
const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.field]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.field]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const pId = props.navigation.getParam('productId');
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === pId)
  );
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: '',
      description: editedProduct ? editedProduct.description : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'OK' }]);
    }
  }, [error]);
  const submitProduct = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert(
        'Invalid data',
        'Please check for data entry errors before saving item.',
        [{ text: 'Okay' }]
      );
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            pId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, pId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitProduct });
  }, [submitProduct]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        field: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Title is not valid."
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initialValidity={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image URL"
            errorText="Image URL is not valid."
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initialValidity={!!editedProduct}
            required
          />
          {!editedProduct && (
            <Input
              id="price"
              label="Price"
              errorText="Price is not valid."
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={''}
              initialValidity={false}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Description is not valid."
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initialValidity={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitItem = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
            onPress={submitItem}
          />
        </HeaderButtons>
      );
    },
  };
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default EditProductScreen;
