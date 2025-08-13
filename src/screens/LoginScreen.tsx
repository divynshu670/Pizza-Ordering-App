import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/authStore';

// Define navigation types locally
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type LoginScreenProps = {
  navigation: {
    navigate: (screen: keyof RootStackParamList) => void;
  };
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginState } = useAuthStore();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    login(email, password);
  };

  React.useEffect(() => {
    if (loginState?.type === 'error') {
      Alert.alert('Error', loginState.message);
    }
  }, [loginState]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pizza App Login</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      
      {loginState?.type === 'loading' ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      
      <View style={styles.buttonContainer}>
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 15,
  },
});