import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { RootStackParamList } from './types';
import HomeTabs from '../screens/HomeTabs';
import CartScreen from '../screens/CartScreen';
import PaymentScreen from '../screens/PaymentScreen';
import { StripeProvider } from '@stripe/stripe-react-native';
import OrderConfirmationScreen from '../screens/ConfirmationScreen';

const STRIPE_PUBLISHABLE_KEY = "pk_test_..............";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { user, refreshUser } = useAuthStore();

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  if (!STRIPE_PUBLISHABLE_KEY) {
    console.error('Stripe publishable key is missing!');
    return null;
  }

  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier="merchant.com.pizzaapp"
      urlScheme="pizzaapp"
    >
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen 
                name="HomeTabs" 
                component={HomeTabs} 
                options={{ 
                  headerShown: false,
                  title: 'Pizza App'
                }} 
              />
              <Stack.Screen 
                name="Cart" 
                component={CartScreen} 
                options={{ 
                  title: 'Your Cart',
                  headerBackTitle: 'Menu',
                }} 
              />
              <Stack.Screen 
                name="Payment" 
                component={PaymentScreen} 
                options={{ 
                  title: 'Payment',
                  headerBackTitle: 'Cart',
                }} 
              />
              <Stack.Screen 
                name="OrderConfirmation" 
                component={OrderConfirmationScreen} 
                options={{ 
                  title: 'Order Confirmed',
                  headerShown: false,
                }} 
              />
            </>
          ) : (
            <>
              <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{ 
                  title: 'Login',
                  animationTypeForReplace: !user ? 'pop' : 'push',
                }} 
              />
              <Stack.Screen 
                name="Signup" 
                component={SignupScreen} 
                options={{ title: 'Sign Up' }} 
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
