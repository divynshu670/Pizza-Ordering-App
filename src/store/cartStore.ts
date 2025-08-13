// src/store/cartStore.ts
import { create } from 'zustand';
import Pizza from '../model/pizza';


// Export the CartItem interface
export interface CartItem {
  pizza: Pizza;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (pizza: Pizza) => void;
  updateQuantity: (pizzaId: string, newQuantity: number) => void;
  removeItem: (pizzaId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addToCart: (pizza) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.pizza.id === pizza.id
      );
      
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.pizza.id === pizza.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, { pizza, quantity: 1 }],
        };
      }
    });
  },

  updateQuantity: (pizzaId, newQuantity) => {
    set((state) => {
      if (newQuantity <= 0) {
        return {
          cartItems: state.cartItems.filter((item) => item.pizza.id !== pizzaId),
        };
      }
      
      return {
        cartItems: state.cartItems.map((item) =>
          item.pizza.id === pizzaId
            ? { ...item, quantity: newQuantity }
            : item
        ),
      };
    });
  },

  removeItem: (pizzaId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.pizza.id !== pizzaId),
    }));
  },

  clearCart: () => {
    set({ cartItems: [] });
  },

  getTotalPrice: () => {
    return get().cartItems.reduce(
      (total, item) => total + item.pizza.price * item.quantity,
      0
    );
  },
}));