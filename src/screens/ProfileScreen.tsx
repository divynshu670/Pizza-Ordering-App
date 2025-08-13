import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/authStore';

export default function ProfileScreen() {
  const { user, updateAddress, logout } = useAuthStore();
  const [newAddress, setNewAddress] = useState(user?.address || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateAddress = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      await updateAddress(user.uid, newAddress);
      Alert.alert('Success', 'Address updated successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update address');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user?.name}</Text>
        
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>
        
        <Text style={styles.label}>Current Address:</Text>
        <Text style={styles.value}>{user?.address || 'Not set'}</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Update Address</Text>
        <TextInput
          value={newAddress}
          onChangeText={setNewAddress}
          placeholder="Enter new delivery address"
          style={styles.input}
        />
        
        {isUpdating ? (
          <ActivityIndicator size="small" />
        ) : (
          <Button 
            title="Save Changes" 
            onPress={handleUpdateAddress}
            disabled={!newAddress || newAddress === user?.address}
          />
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={logout} color="#ff5252" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
});