import { create } from 'zustand';
import PizzaRepository from '../repository/PizzaRepository';
import Pizza from '../models/Pizza';

type PizzaState = {
  pizzas: Pizza[];
  loading: boolean;
  error: string | null;
  fetchPizzas: () => Promise<void>;
};

export const usePizzaStore = create<PizzaState>((set) => ({
  pizzas: [],
  loading: false,
  error: null,

  fetchPizzas: async () => {
    set({ loading: true, error: null });
    
    const result = await PizzaRepository.getPizzas();
    
    if (result.type === 'success') {
      set({ pizzas: result.data, loading: false });
    } else if (result.type === 'error') {
      set({ error: result.message, loading: false });
    }
  }
}));