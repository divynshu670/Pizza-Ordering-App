import axios from 'axios';

const STRIPE_API_URL = 'https://api.stripe.com/v1';

export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  try {
    const response = await axios.post(
      `${STRIPE_API_URL}/payment_intents`,
      {
        amount,
        currency,
        payment_method_types: ['card'],
      },
      {
        headers: {
          Authorization: `Bearer sk_test_..............secret key`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};