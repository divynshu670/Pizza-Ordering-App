import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { usePizzaStore } from '../store/pizzaStore';
import { useCartStore } from '../store/cartStore';
import Pizza from '../model/pizza';

export default function PizzaMenuScreen() {
  const { pizzas, loading, error, fetchPizzas } = usePizzaStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  const renderPizzaItem = ({ item }: { item: Pizza }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => console.log('Navigate to pizza detail', item.id)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() =>  addToCart(item)}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity onPress={fetchPizzas} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={pizzas}
      renderItem={renderPizzaItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.columnWrapper}
      ListEmptyComponent={
        <View style={styles.center}>
          <Text style={styles.emptyText}>No pizzas available</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  list: {
    padding: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    width: '48%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    height: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  addButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  retryButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
});