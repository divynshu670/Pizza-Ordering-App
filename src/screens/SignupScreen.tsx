import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/authStore';


// Define navigation types locally
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type SignupScreenProps = {
  navigation: {
    navigate: (screen: keyof RootStackParamList) => void;
  };
};

export default function SignupScreen({ navigation }: SignupScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const { signup, signupState } = useAuthStore();

  const handleSignup = () => {
    if (!name || !email || !password || !address) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    signup(name, email, password, address);
  };

  React.useEffect(() => {
    if (signupState?.type === 'error') {
      Alert.alert('Error', signupState.message);
    }
  }, [signupState]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      
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
      
      <TextInput
        placeholder="Delivery Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      
      {signupState?.type === 'loading' ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Create Account" onPress={handleSignup} />
      )}
      
      <View style={styles.buttonContainer}>
        <Button
          title="Already have an account? Login"
          onPress={() => navigation.navigate('Login')}
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