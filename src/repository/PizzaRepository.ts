import firestore from '@react-native-firebase/firestore';
import Pizza from '../models/Pizza';
import { Resource } from '../core/resource';



class PizzaRepository {
  private pizzasCollection = firestore().collection('pizzas');

  async getPizzas(): Promise<Resource<Pizza[]>> {
  try {
    const snapshot = await this.pizzasCollection.get();
    const pizzas: Pizza[] = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      pizzas.push({
        id: doc.id,
        name: data.name || "Unnamed Pizza",
        description: data.description || "",
        price: data.price || 0,
        imageUrl: data.imageUrl || ""
      });
    });
    
    console.log("Fetched pizzas:", pizzas); // Add this for debugging
    return { type: 'success', data: pizzas };
  } catch (error: any) {
    console.error("Firestore error:", error); // Add this for debugging
    return { type: 'error', message: error.message || 'Failed to fetch pizzas' };
  }
}
}

// Export a singleton instance
export default new PizzaRepository();