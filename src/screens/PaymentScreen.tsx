// src/screens/PaymentScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { createPaymentIntent } from '../service/StripeAPIService';
import { StackNavigationProp } from '@react-navigation/stack';

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;
type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;

const PaymentScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const route = useRoute<PaymentScreenRouteProp>();
  const navigation = useNavigation<PaymentScreenNavigationProp>();
  const totalPrice = route.params.totalPrice;

  // Wrap initialization in useCallback
  const initializePaymentSheet = useCallback(async () => {
    try {
      setLoading(true);
      
      // Create payment intent
      const amountInCents = Math.round(totalPrice * 100);
      const paymentIntent = await createPaymentIntent(amountInCents);
      
      // Initialize payment sheet
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntent.client_secret,
        merchantDisplayName: 'Pizza Shop',
        allowsDelayedPaymentMethods: false,
      });

      if (error) {
        Alert.alert('Error', error.message || 'Failed to initialize payment');
      } else {
        setPaymentSheetEnabled(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to initialize payment');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [totalPrice, initPaymentSheet]);

  useEffect(() => {
    initializePaymentSheet();
  }, [initializePaymentSheet]);

  const handlePayPress = async () => {
    setLoading(true);
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert('Error', error.message || 'Payment failed');
    } else {
      // Navigate to confirmation screen on success
      navigation.navigate('OrderConfirmation');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>
      
      <View style={styles.card}>
        <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#e91e63" />
        ) : (
          <View style={styles.buttonContainer}>
            <Text style={styles.note}>
              You'll be redirected to Stripe to complete your payment
            </Text>
            <TouchableOpacity 
              style={styles.payButton}
              onPress={handlePayPress}
              disabled={!paymentSheetEnabled || loading}
            >
              <Text style={styles.payButtonText}>
                Pay ${totalPrice.toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#e91e63',
  },
  buttonContainer: {
    marginTop: 20,
  },
  note: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  payButton: {
    backgroundColor: '#e91e63',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;