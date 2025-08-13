/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { CartItem, useCartStore } from '../store/cartStore';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { StackNavigationProp } from '@react-navigation/stack';



type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

const CartScreen = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
    const { cartItems, updateQuantity, getTotalPrice } = useCartStore();
    const totalPrice = getTotalPrice();

  const handleProceedToPayment = () => {
    if (cartItems.length > 0) {
      navigation.navigate('Payment', { totalPrice });
    }
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.pizza.imageUrl }} style={styles.pizzaImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.pizzaName}>{item.pizza.name}</Text>
        <Text style={styles.pizzaPrice}>${item.pizza.price.toFixed(2)} each</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            onPress={() => updateQuantity(item.pizza.id, item.quantity - 1)}
            style={[styles.quantityButton, item.quantity === 1 && styles.deleteButton]}
          >
            {item.quantity === 1 ? (
              <MaterialIcons name="delete" size={20} color="#ff5252" />
            ) : (
              <MaterialIcons name="remove" size={20} color="#e91e63" />
            )}
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity 
            onPress={() => updateQuantity(item.pizza.id, item.quantity + 1)}
            style={styles.quantityButton}
          >
            <MaterialIcons name="add" size={20} color="#e91e63" />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.itemTotal}>${(item.pizza.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="shopping-cart" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubText}>Add delicious pizzas to get started!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.pizza.id}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={handleProceedToPayment}
            >
              <Text style={styles.checkoutText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#555',
  },
  emptySubText: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  pizzaImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  pizzaName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pizzaPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#fce4ec',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    minWidth: 70,
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  checkoutButton: {
    backgroundColor: '#e91e63',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;