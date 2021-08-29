import React, { useCallback, useEffect, useReducer } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
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
    formIsValid: false,
  });

  const submitProduct = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Invalid title', 'Please enter a title to save the item.', [
        { text: 'Okay' },
      ]);
      return;
    }
    editedProduct
      ? dispatch(
          productsActions.updateProduct(
            pId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        )
      : dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
    props.navigation.goBack();
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
  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id='title'
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
          id='imageUrl'
          label="Image URL"
          errorText="Image URL is not valid."
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ''}
          initialValidity={!!editedProduct}
          required
        />
        {!editedProduct && (
        <Input
          id='price'
          label="Price"
          errorText="Price is not valid."
          keyboardType="decimal-pad"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={''}
          initialValidity={}
          required
          min={0.1}
        />
        )
}
        <Input
          id='description'
          label="Description"
          errorText="Description is not valid."
          autoCapitalize="sentences"
          multiline
          numberOfLines={3}
          returnKeyType="done"
          onInputChange={inputChangeHandler}
          initialValue={''}
          initialValidity={!!editedProduct}
          required
          minLength={5}
        />
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={textChangeHandler.bind(this, 'imageUrl')}
            returnKeyType="next"
          />
          {!formState.inputValidities.imageUrl && (
            <Text style={styles.warning}>Image URL is not valid.</Text>
          )}
        </View>
        {!editedProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={textChangeHandler.bind(this, 'price')}
              keyboardType="decimal-pad"
              returnKeyType="next"
            />
            {!formState.inputValidities.price && (
              <Text style={styles.warning}>Price is not valid.</Text>
            )}
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={textChangeHandler.bind(this, 'description')}
            returnKeyType="done"
          />
          {!formState.inputValidities.description && (
            <Text style={styles.warning}>Description is not valid.</Text>
          )}
        </View>
      </View>
    </ScrollView>
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
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  warning: {
    color: 'red',
  },
});

export default EditProductScreen;
