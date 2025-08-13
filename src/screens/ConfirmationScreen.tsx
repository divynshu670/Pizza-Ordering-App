// src/screens/OrderConfirmationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type ConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OrderConfirmation'>;

const OrderConfirmationScreen = () => {
  const navigation = useNavigation<ConfirmationScreenNavigationProp>();

  const handleBackToHome = () => {
    navigation.navigate('HomeTabs');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.message}>Your payment was successful</Text>
        <Text style={styles.message}>Thank you for your order!</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleBackToHome}
        >
          <Text style={styles.buttonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 30,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2e7d32',
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e91e63',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 30,
    minWidth: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OrderConfirmationScreen;